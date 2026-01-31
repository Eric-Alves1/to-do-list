const input = document.querySelector('#input');
const buttonAdd = document.querySelector('#new-task');
const totalItemsText = document.querySelector('#totalItems');
const pendingItemsText = document.querySelector('#pendingItems')
const completedItemsText = document.querySelector('#completedItems')
const selectPriorities = document.querySelector('#priority');
const selectCategories = document.querySelector('#categorie');
const todoListDiv = document.querySelector('#todo-list');

class TodoDOM {
  createDom(itemId, itemValue, itemPriority, itemCategorie) {
    const data = todoList.myMap.get(id.toString());
    
    let priorityText;
    if (itemPriority === 'veryImportant') {
      priorityText = ' Priority: Very-Important';
    } else if (itemPriority === 'important') {
      priorityText = ' Priority: Important';
    } else if (itemPriority === 'lessImportant') {
      priorityText = ' Priority: Less-Important';
    }
  
    let categorieText;
    if (itemCategorie === 'personal') {
      categorieText = ' Categorie: Personal';
    } else if (itemCategorie === 'work') {
      categorieText = ' Categorie: Work';
    } else if (itemCategorie === 'study') {
      categorieText = ' Categorie: Study';
    } else if (itemCategorie === 'health') {
      categorieText = ' Categorie: Health';
    } else if (itemCategorie === 'others') {
      categorieText = ' Categorie: Others';
    }
    
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-item');
    if (data.finish === true) {
      pendingTasks--;
      completedTasks++;
      todoContainer.classList.add('finished');
    }
    todoContainer.setAttribute('id', itemId);
    totalItemsText.textContent = `${totalTasks} Total items`;
    pendingItemsText.textContent = `${pendingTasks} Pending Items`;
    completedItemsText.textContent = `${completedTasks} Completed items`;
  
    const todoTitle = document.createElement('h3');
    todoTitle.classList.add('todo-title');
    todoTitle.textContent = `Task: ${itemValue}`;
  
    const todoPriority = document.createElement('h3');
    todoPriority.classList.add('todo-priority');
    todoPriority.textContent = priorityText;
  
    const todoCategorie = document.createElement('h3');
    todoCategorie.classList.add('todo-categorie');
    todoCategorie.textContent = categorieText;
  
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
  
    todoListDiv.appendChild(todoContainer);
  }
}

const todoDom = new TodoDOM();

const todoList = new TodoList();

function clearInput() {
  input.value = '';
  input.focus();
}


function handleClick(event) {
  const item = event.target.closest('.todo-item');

  if (!item) return;

  if (event.target.classList.contains('button-edit')) {
    todoList.Edit(item);
  } else if (event.target.classList.contains('button-delete')) {
    todoList.Delete(item);
  } else if (event.target.classList.contains('button-finish')) {
    todoList.Finish(item);
  }
  save();
}

function getValues() {
  return Array.from(todoList.myMap.values());
}

function load() {
  for (const stored_values of JSON.parse(localStorage.getItem('todo-list') ?? '[]')) {
    todoList.addItem(stored_values.text, stored_values.selectedPriority, stored_values.selectedCategorie, stored_values.finish);
  }
}

function save() {
  localStorage.setItem('todo-list', JSON.stringify(getValues()));
}

todoListDiv.addEventListener('click', handleClick);

buttonAdd.addEventListener('click', () => {
  const value = input.value;
  const priority = selectPriorities.value;
  const categorie = selectCategories.value;
  if (value.trim() === '') {
    alert('you must write something!');
    return;
  } else if (priority === '') {
    alert('you must choose a priority!');
    return;
  } else if (categorie === '') {
    alert('you must choose a categorie');
    return;
  }

  todoList.addItem(value, priority, categorie);
  save();
});

load();
