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
  if (value === "") {
    alert('you must write something!')
    return;
  }
  
  if (todos.length >= 5) {
    alert('you can only write 5 todos!');
    clearInput();
    return;
  }
  todos.push(value);
  
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo')
  
  const todoItem = document.createElement('h3');
  todoItem.classList.add('todo-item');
  todoItem.textContent = value;
    
  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('button-edit')
  buttonEdit.textContent = 'edit';
  buttonEdit.addEventListener('click', btnEdit);
    
  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('button-delete')
  buttonDelete.textContent = 'delete';
  buttonDelete.addEventListener('click', btnDelete);
    
  const buttonFinish = document.createElement('button');
  buttonFinish.classList.add('button-finish');
  buttonFinish.textContent = 'finish';
  buttonFinish.addEventListener('click', btnFinish);
    
  todoContainer.appendChild(todoItem)
  todoContainer.appendChild(buttonEdit)
  todoContainer.appendChild(buttonDelete)
  todoContainer.appendChild(buttonFinish)
  
  todoList.appendChild(todoContainer);
  
  clearInput();
}

function btnEdit() {
  alert('its working');
}

function btnDelete() {
  alert('its working');
}

function btnFinish() {
  alert('its working');
}

buttonAdd.addEventListener('click', addItem);