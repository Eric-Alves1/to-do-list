const input = document.querySelector('#input');
const buttonAdd = document.querySelector('#new-task');
const totalItemsText = document.querySelector('#totalItems');
const pendingItemsText = document.querySelector('#pendingItems')
const completedItemsText = document.querySelector('#completedItems')
const selectPriorities = document.querySelector('#priority');
const selectCategories = document.querySelector('#categorie');
const todoListDiv = document.querySelector('#todo-list');

class TodoItem {
  constructor(text, priorityValue, categorieValue, date, finish) {
    if (text === undefined || priorityValue === undefined || categorieValue === undefined || finish === undefined || date === undefined) {
      throw new Error('An argument is missing!');
    }
    this.text = text;
    this.priorityValue = priorityValue;
    this.categorieValue = categorieValue;
    this.date = date;
    this.finish = finish;
  }
}

let id = 0;
let totalTasks = 0;
let pendingTasks = 0;
let completedTasks = 0;

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

class TodoList {
  myMap = new Map();
  
  addItem(value, priority, categorie, done = false) {
    id++;
    totalTasks++;
    pendingTasks++;
  
    this.myMap.set(id.toString(), {
      text: value,
      selectedPriority: priority,
      selectedCategorie: categorie,
      finish: done,
    });
  
    todoDom.createDom(id, value, priority, categorie);
    clearInput();
  }
  
  Edit(item) {
    let editing = item.querySelector('.edit-input');
    let editingPriority = item.querySelector('.edit-priority');
    let editingCategorie = item.querySelector('.edit-categorie');
  
    const todoTitle = item.querySelector('h3');
    const todoPriority = item.querySelector('.todo-priority');
    const todoCategorie = item.querySelector('.todo-categorie');
  
    const itemId = item.getAttribute('id');
    const data = this.myMap.get(itemId);
  
    if (editing) {
      if (editing.value.trim() === '' || editingPriority.value === '' || editingCategorie.value === '') {
        alert('you must change something!');
        return;
      }
  
      this.myMap.set(itemId, {
        text: editing.value,
        selectedPriority: editingPriority.value,
        selectedCategorie: editingCategorie.value,
      });
      
      let newPriorityText;
      if (editingPriority.value === 'veryImportant') {
        newPriorityText = ' Priority: Very-Important';
      } else if (editingPriority.value === 'important') {
        newPriorityText = ' Priority: Important';
      } else if (editingPriority.value === 'lessImportant') {
        newPriorityText = ' Priority: Less-Important';
      }
      
      let newCategorieText;
      if (editingCategorie.value === 'personal') {
        newCategorieText = ' Categorie: Personal';
      } else if (editingCategorie.value === 'work') {
        newCategorieText = ' Categorie: Work';
      } else if (editingCategorie.value === 'study') {
        newCategorieText = ' Categorie: Study';
      } else if (editingCategorie.value === 'health') {
        newCategorieText = ' Categorie: Health';
      } else if (editingCategorie.value === 'others') {
        newCategorieText = ' Categorie: Others';
      }
      
      todoTitle.textContent = `Task: ${editing.value}`;
      todoPriority.textContent = newPriorityText;
      todoCategorie.textContent = newCategorieText;
  
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
  
  Delete(item) {
    const itemId = item.getAttribute('id');
    const data = this.myMap.get(itemId);
    if (itemId && data.finish === false) {
      totalTasks--;
      pendingTasks--;
      this.myMap.delete(itemId);
    } else if (itemId && data.finish === true) {
      totalTasks--;
      completedTasks--;
      this.myMap.delete(itemId);
    }
    item.remove();
    totalItemsText.textContent = `${totalTasks} Total items`;
    pendingItemsText.textContent = `${pendingTasks} Pending items`;
    completedItemsText.textContent = `${completedTasks} Completed items`
  }
  
  Finish(item) {
    const itemId = item.getAttribute('id');
    let data = this.myMap.get(itemId);
    console.log(data)
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
  
    this.myMap.set(itemId, {
      text: data.text,
      selectedPriority: data.selectedPriority,
      selectedCategorie: data.selectedCategorie,
      finish: data.finish,
    });
  
    pendingItemsText.textContent = `${pendingTasks} Pending items`
    completedItemsText.textContent = `${completedTasks} Completed items`
  }
}

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
