const input = document.querySelector('#input');
const buttonAdd = document.querySelector('#new-task');
const todoList = document.querySelector('#todo-list');
const todos = [];

function clearInput() {
  input.value = "";
  input.focus();
}

function addItem() {
  let value = input.value;
  todos.push(value);
  if (todos.length > 5) {
    alert('you can only write 5 todos!');
    clearInput();
    return;
  }
  
  if (value === "") {
    alert('you must write something!')
  } else {
    const todoItem = document.createElement('h3');
    todoItem.classList.add('todo-item');
    todoItem.textContent = value;
    document.body.appendChild(todoItem);
    
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button-edit')
    buttonEdit.textContent = 'edit';
    document.body.appendChild(buttonEdit);
    
    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button-delete')
    buttonDelete.textContent = 'delete';
    document.body.appendChild(buttonDelete);
    
    const buttonFinish = document.createElement('button');
    buttonFinish.classList.add('button-finish');
    buttonFinish.textContent = 'finish';
    document.body.appendChild(buttonFinish);
    
    clearInput();
  }
}

buttonAdd.addEventListener('click', addItem);