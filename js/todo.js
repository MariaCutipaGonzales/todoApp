const Todo= () => {
	const parent = $('<div class="white-card"></div>');
	const input = $('<input id="input-item" type="text" placeholder="Ingresa la tarea">');
	const todoTitle = $('<p>To Do Items:</p>');
	const list = $('<div class="list"></div>');
	const hr = $('<hr>');
	const completedTitle = $('<p>Completed Items</p>');
	const completedList = $('<div class="completed"></div>');

	parent.append(input);
	parent.append(todoTitle);
	parent.append(list);
	parent.append(hr);
	parent.append(completedTitle);
	parent.append(completedList);


	input.on('keypress',(e) => {
		if (e.which === 13) {
			if (input.val() != "") {
				state.todos.push({
					text: input.val(),
					completed : false
				});
			input.val('');
			reRender(list,completedList);
			}
		}
	});
	return parent;
}

const TodoItem = (data,update) => {
	const todo = $('<div class="todo"></div>');
	const checkbox = $('<input type="checkbox">');
	const span = $('<span>'+data.text+'</span>');
	const remove = $('<button>Remove</button>');

	todo.append(checkbox);
	todo.append(span);
	todo.append(remove);

	checkbox.on('change', (e) => {
		data.completed = !data.completed;
		update();
	});

	remove.on('click',(e) => {
		const idx= state.todos.map( x => x.text ).indexOf(data.text);
		state.todos.splice(idx,1);
		update();
	});

	return todo;
}


const reRender = (todoList,completedList) =>{
	todoList.empty();
	completedList.empty();
	state.todos.forEach(todo => {
		if (!todo.completed) {
			todoList.append(TodoItem(todo,_ => { reRender(todoList,completedList);}));
		}else{
			completedList.append(TodoItem(todo,_ => { reRender(todoList,completedList);}));
		}
	});
}

