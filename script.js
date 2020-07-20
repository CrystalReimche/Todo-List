// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// FUNCTIONS
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    console.log('hello');
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); //adds li to todoDiv
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    // Checked Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Append to list
    todoList.appendChild(todoDiv);
    // Clear Todo Input Value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // Delete Todo
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }

    // Checked Button
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            default:
                todo.style.display = 'flex';
        }
    });
}

function saveLocalTodos(todo) {
    // Check --- Do I already have a todo list?
    let todos;

    if (localStorage.getItem('todos') === null) {
        // if no todo is in local storage, create a new array
        todos = [];
    } else {
        // load existing todo array 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // add the new todo to existing array
    todos.push(todo);
    // save it back to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        // if no todo is in local storage, create a new array
        todos = [];
    } else {
        // load existing todo array 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        // Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo); //adds li to todoDiv
        // Checked Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        // Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        // if no todo is in local storage, create a new array
        todos = [];
    } else {
        // load existing todo array 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // Grab the text from the array index that was selected to be deleted
    const todoIndex = todo.children[0].innerText;
    // Remove only that 1 element
    todos.splice(todos.indexOf(todoIndex), 1);
    // Save back to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}