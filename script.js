const input = document.querySelector('#input');
const buttonAdd = document.querySelector('#new-task');
const number_of_items = document.querySelector('#numItems');
const select = document.querySelector('#priority')
const todoList = document.querySelector('#todo-list');

function clearInput() {
  input.value = '';
  input.focus();
}

const myMap = new Map();
let id = 0;

function addItem(value, importance) {
  id++;
  
  const priority = select.value;
  let selected_priority;
  if (priority === 'veryImportant') {
    selected_priority = " (Very important)";
  } else if (priority === 'important') {
    selected_priority = " (Important)";
  } else if (priority === 'lessImportant') {
    selected_priority = " (Less important)";
  } else {
    selected_priority = "";
  }
  
  myMap.set(id.toString(), value);
  select.value = "";
  number_of_items.textContent = `${myMap.size} items.`;
  
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo-item');
  todoContainer.setAttribute('id', id);

  const todoTitle = document.createElement('h3');
  todoTitle.classList.add('todo-title');
  todoTitle.textContent = value + selected_priority;


  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('button-edit');
  buttonEdit.textContent = 'Edit';

  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('button-delete');
  buttonDelete.textContent = 'Delete';


  const buttonFinish = document.createElement('button');
  buttonFinish.classList.add('button-finish');
  buttonFinish.textContent = 'Finish';

  todoContainer.appendChild(todoTitle);
  todoContainer.appendChild(buttonEdit);
  todoContainer.appendChild(buttonDelete);
  todoContainer.appendChild(buttonFinish);

  todoList.appendChild(todoContainer);

  clearInput();
}

function Edit(item) {
  const todoTitle = item.querySelector('h3');
  const editing = item.querySelector('input');

  if (editing) {
    if (editing.value.trim() === '') {
      alert('you must write something!');
      return;
    }
    const itemId = item.getAttribute('id');
    const itemValue = editing.value;
    if (itemId) {
      myMap.set(itemId, itemValue);
      todoTitle.textContent = itemValue;
      todoTitle.style.display = 'block';
      editing.remove();
    }
    todoTitle.textContent = editing.value;
    editing.remove();
    todoTitle.style.display = 'block';
    return;
  }

  const editInput = document.createElement('input');
  editInput.classList.add('input-edit');
  editInput.value = todoTitle.textContent;
  todoTitle.style.display = 'none';
  item.insertBefore(editInput, todoTitle);
  editInput.focus();
}

function Delete(item) {
  const itemId = item.getAttribute('id');
  if (itemId) {
    myMap.delete(itemId);
  }
  item.remove();
  number_of_items.textContent = `${myMap.size} items.`;
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

function getValues() {
  return Array.from(myMap.values());
}

function load() {
  for (const stored_value of JSON.parse(localStorage.getItem('todo-list') ?? '[]')) {
    addItem(stored_value);
  }
}

function save() {
  localStorage.setItem('todo-list', JSON.stringify(getValues()));
}

todoList.addEventListener('click', handleClick);

buttonAdd.addEventListener('click', () => {
  const value = input.value;
  const priority = select.value;
  if (value.trim() === '') {
    alert('you must write something!');
    return;
  }
  
  if (priority === "") {
    alert('you must choose a priority!');
    return;
  }
  addItem(value);
  save();
});

load();
