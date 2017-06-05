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


