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
  
  todos.push(value);
  
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo-item')
  
  const todoItem = document.createElement('h3');
  todoItem.classList.add('todo-title');
  todoItem.textContent = value;
    
  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('button-edit')
  buttonEdit.textContent = 'edit';

  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('button-delete')
  buttonDelete.textContent = 'delete';

  const buttonFinish = document.createElement('button');
  buttonFinish.classList.add('button-finish');
  buttonFinish.textContent = 'finish';
    
  todoContainer.appendChild(todoItem)
  todoContainer.appendChild(buttonEdit)
  todoContainer.appendChild(buttonDelete)
  todoContainer.appendChild(buttonFinish)
  
  todoList.appendChild(todoContainer);
  
  clearInput();
}

function Edit(item) {
  const todoTitle = item.querySelector('h3');
  const editing = item.querySelector('input');
  
  if (editing) {
    if (editing.value === "") {
      alert('you must write something!')
      return;
    }
    
    for (let i = 0; i < todoList.children.length; i++) {
    if (todoList.children[i] === item) {
      todos.splice(i, 1);
      todos.splice(i, 0, editing.value);
    }
    }
    
    todoTitle.textContent = editing.value;
    editing.remove();
    todoTitle.style.display = 'block';
    return;
  }
  
  const editInput = document.createElement('input');
  editInput.value = todoTitle.textContent;
  todoTitle.style.display = 'none';
  item.insertBefore(editInput, todoTitle);
  editInput.focus();
}

function Delete(item) {
  for (let i = 0; i < todoList.children.length; i++) {
    if (todoList.children[i] === item) {
      item.remove();
      todos.splice(i, 1);
    }
  }
}

function Finish(item) {
  item.classList.toggle('finished');
}

function handleClick(event) {
  const item = event.target.closest('.todo-item');
  
  if (!item) return;
  
  if (event.target.classList.contains('button-edit')) {
    Edit(item);
  } else if (event.target.classList.contains('button-delete')) {
    Delete(item);
  } else if (event.target.classList.contains('button-finish')) {
    Finish(item);
  }
  save();
}

function save() {
  localStorage.setItem('todo-list', JSON.stringify(todos));
  console.log(JSON.parse(localStorage.getItem('todo-list')));
}

todoList.addEventListener('click', handleClick);

buttonAdd.addEventListener('click', () => {
  addItem();
  save();
});