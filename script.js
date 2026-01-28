class TodoItem {
  constructor(text, selectedPriority, selectedCategorie) {
    this.text = text;
    this.selectedPriority = selectedPriority;
    this.selectedCategorie = selectedCategorie;
  }
}
console.log(new TodoItem('some text', 'Very-Important', 'i did not learned about how to stop being dumb..'));

const input = document.querySelector('#input');
const buttonAdd = document.querySelector('#new-task');
const number_of_items = document.querySelector('#numItems');
const selectPriorities = document.querySelector('#priority');
const selectCategories = document.querySelector('#categorie');
const todoList = document.querySelector('#todo-list');

const myMap = new Map();
let id = 0;
let pendingTasks = 0;
let completedTasks = 0;
let selected_priority_weight;


function addItem(value, priority, categorie, done = false) {
  id++;
  pendingTasks++;
  
  let selected_priority;
  if (priority === 'Very-Important') {
    selected_priority = " Priority: Very-Important";
    selected_priority_weight = 1;
  } else if (priority === 'important') {
    selected_priority = " Priority: Important";
    selected_priority_weight = 2;
  } else if (priority === 'Less-Important') {
    selected_priority = " Priority: Less-Important";
    selected_priority_weight = 3;
  } else {
    selected_priority = "";
  }
  
  let selected_categorie;
  if (categorie === 'Personal') {
    selected_categorie = " Categorie: Personal";
  } else if (categorie === 'Work') {
    selected_categorie = " Categorie: Work";
  } else if (categorie === 'Study') {
    selected_categorie = " Categorie: Study";
  } else if (categorie === 'Health') {
    selected_categorie = " Categorie: Health";
  } else if (categorie === 'Others') {
    selected_categorie = " Categorie: Others";
  } else {
    selected_categorie = "";
  }
  
  myMap.set(id.toString(), new TodoItem(value, selected_priority, selected_categorie));
  
  const data = myMap.get(id.toString());
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo-item');
  if (data.finish === true) {
    completedTasks++;
    pendingTasks--;
    todoContainer.classList.add('finished');
  }
  todoContainer.setAttribute('id', id);
  number_of_items.textContent = `${pendingTasks} Items pending / ${completedTasks} Items completed`;

  const todoTitle = document.createElement('h3');
  todoTitle.classList.add('todo-title');
  todoTitle.textContent = `Task: ${value}`;
  
  const todoPriority = document.createElement('h3');
  todoPriority.classList.add('todo-priority');
  todoPriority.textContent = selected_priority;
  
  const todoCategorie = document.createElement('h3');
  todoCategorie.classList.add('todo-categorie');
  todoCategorie.textContent = selected_categorie;

  const createDate = new Date();
  const year = createDate.getFullYear();
  const month = createDate.getMonth() + 1;
  const day = createDate.getDate();
  
  const todoDate = document.createElement('h3');
  todoDate.classList.add('todo-date');
  todoDate.textContent = `Date: ${year}/${month}/${day}`;

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
  todoContainer.appendChild(todoPriority);
  todoContainer.appendChild(todoCategorie);
  todoContainer.appendChild(todoDate);
  todoContainer.appendChild(buttonEdit);
  todoContainer.appendChild(buttonDelete);
  todoContainer.appendChild(buttonFinish);

  todoList.appendChild(todoContainer);

  clearInput();
}

function Edit(item) {
  let editing = item.querySelector('.edit-input');
  let editingPriority = item.querySelector('.edit-priority');
  let editingCategorie = item.querySelector('.edit-categorie');
  
  const todoTitle = item.querySelector('h3');
  const todoPriority = item.querySelector('.todo-priority');
  const todoCategorie = item.querySelector('.todo-categorie');

  const itemId = item.getAttribute('id');
  const data = myMap.get(itemId);

  if (editing) {
    if (editing.value.trim() === '' || editingPriority.value === '' || editingCategorie.value === '') {
      alert('you must change something!');
      return;
    }

      myMap.set(itemId, new TodoItem(editing.value, editingPriority.value, editingCategorie.value));
      
      todoTitle.textContent = editing.value;
      todoPriority.textContent = `Priority: ${editingPriority.value}`;
      todoCategorie.textContent = `Categorie: ${editingCategorie.value}`;
      
      todoTitle.style.display = 'block';
      todoPriority.style.display = 'block';
      todoCategorie.style.display = 'block';
      
      editing.remove();
      editingPriority.remove();
      editingCategorie.remove();
      return;
    }
    
  const editInput = document.createElement('input');
  const editPriority = selectPriorities.cloneNode(true);
  const editCategorie = selectCategories.cloneNode(true);

  editInput.classList.add('edit-input');
  editPriority.classList.add('edit-priority');
  editCategorie.classList.add('edit-categorie');

  editInput.value = data.text;
  editPriority.value = data.selectedPriority;
  editCategorie.value = data.selectedCategorie;
  
  todoTitle.style.display = 'none';
  todoPriority.style.display = 'none';
  todoCategorie.style.display = 'none';
  
  item.prepend(editInput);
  item.prepend(editPriority);
  item.prepend(editCategorie);
  editInput.focus();
}

function Delete(item) {
  const itemId = item.getAttribute('id');
  const data = myMap.get(itemId);
  if (itemId) {
    pendingTasks--;
    myMap.delete(itemId);
  }
  item.remove();
  number_of_items.textContent = `${pendingTasks} Items pending / ${completedTasks} Items completed`;
}

function Finish(item) {
  const itemId = item.getAttribute('id');
  const data = myMap.get(itemId);
  if (data.finish === false) {
    data.finish = true;
    completedTasks++;
    pendingTasks--;
    item.classList.add('finished');
  } else if (data.finish === true) {
    data.finish = false;
    completedTasks--;
    pendingTasks++;
    item.classList.remove('finished');
  }
  
  myMap.set(itemId, {
    text: data.text,
    selectedPriority: data.selectedPriority,
    selectedCategorie: data.selectedCategorie,
    finish: data.finish
  })
  
  number_of_items.textContent = `${pendingTasks} Items pending / ${completedTasks} Items completed`;
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
  for (const stored_values of JSON.parse(localStorage.getItem('todo-list') ?? '[]')) {
    addItem(stored_values.text, stored_values.selectedPriority, stored_values.selectedCategorie, stored_values.finish);
  }
}

function save() {
  localStorage.setItem('todo-list', JSON.stringify(getValues()));
}

function clearInput() {
  input.value = '';
  input.focus();
}

todoList.addEventListener('click', handleClick);

buttonAdd.addEventListener('click', () => {
  const value = input.value;
  const priority = selectPriorities.value;
  const categorie = selectCategories.value;
  
  if (value.trim() === '') {
    alert('you must write something!');
    return;
  } else if (priority === "") {
    alert('you must choose a priority!');
    return;
  } else if (categorie === "") {
    alert('you must choose a categorie');
    return;
  }
  
  addItem(value, priority, categorie);
  save();
});

load();
