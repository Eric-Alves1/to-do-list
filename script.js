const input = document.querySelector('#input');
const buttonAdd = document.querySelector('#new-task');
const totalItems = document.querySelector('#totalItems');
const pendingItems = document.querySelector('#pendingItems');
const completedItems = document.querySelector('#completedItems');
const selectPriorities = document.querySelector('#priority');
const selectCategories = document.querySelector('#categorie');
const todoListDiv = document.querySelector('#todo-list');

class TodoItem {
  constructor(text, priorityValue, categorieValue, date, finish) {
    if (text === undefined || priorityValue === undefined || categorieValue === undefined || finish === undefined || 
      date === undefined) {
      throw new Error('An argument is missing!');
    }
    this.text = text;
    this.priorityValue = priorityValue;
    this.categorieValue = categorieValue;
    this.date = date
    this.finish = finish;
  }
}


class TodoList {
  myMap = new Map();
  id = 0;
  totalText = 0;
  pendingText = 0;
  completedText = 0;
  
  addItem(value, priority, categorie, date, done = false) {
    this.id++;
    this.totalText++;
    this.pendingText++;
    
    let priority_text;
    if (priority === 'veryImportant') {
      priority_text = " Priority: Very-Important";
    } else if (priority === 'important') {
      priority_text = " Priority: Important";
    } else if (priority === 'lessImportant') {
      priority_text = " Priority: Less-Important";
    } else if (priority === '') {
      alert('you must choose a priority!');
      return;
    }
  
    let categorie_text;
    if (categorie === 'personal') {
      categorie_text = " Categorie: Personal";
    } else if (categorie === 'work') {
      categorie_text = " Categorie: Work";
    } else if (categorie === 'study') {
      categorie_text = " Categorie: Study";
    } else if (categorie === 'health') {
      categorie_text = " Categorie: Health";
    } else if (categorie === 'others') {
      categorie_text = " Categorie: Others";
    } else if (categorie === '') {
      alert('you must choose a categorie!');
      return;
    }
    
    
    this.myMap.set(this.id, new TodoItem(value, priority, categorie, date, done));
    
    const data = this.myMap.get(this.id);
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-item');
    if (data.finish === true) {
      this.completedText++;
      this.pendingText--;
      todoContainer.classList.add('finished');
    }
    todoContainer.setAttribute('id', this.id.toString());
    totalItems.textContent = `${this.totalText} Total items`;
    pendingItems.textContent = `${this.pendingText} Pending tasks`;
    completedItems.textContent = `${this.completedText} Completed tasks`;
  
    const todoTitle = document.createElement('h3');
    todoTitle.classList.add('todo-title');
    todoTitle.textContent = `Task: ${value}`;
    
    const todoPriority = document.createElement('h3');
    todoPriority.classList.add('todo-priority');
    todoPriority.textContent = priority_text;
    
    const todoCategorie = document.createElement('h3');
    todoCategorie.classList.add('todo-categorie');
    todoCategorie.textContent = categorie_text;
    
    const todoDate = document.createElement('h3');
    todoDate.classList.add('todo-date');
    todoDate.textContent = `Date: ${date[0]}/${date[1]}/${date[2]}`;
  
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
  
    clearInput();
  }
  
  Edit(item) {
    let editing = item.querySelector('.edit-input');
    let editingPriority = item.querySelector('.edit-priority');
    let editingCategorie = item.querySelector('.edit-categorie');
    
    const todoTitle = item.querySelector('h3');
    const todoPriority = item.querySelector('.todo-priority');
    const todoCategorie = item.querySelector('.todo-categorie');
  
    const itemId = parseInt(item.getAttribute('id'));
    const data = this.myMap.get(itemId);
  
    if (editing) {
      if (editing.value.trim() === '' || editingPriority.value === '' || editingCategorie.value === '') {
        alert('you must change something!');
        return;
      }
  
        this.myMap.set(itemId, new TodoItem(editing.value, editingPriority.value, editingCategorie.value, data.date, data.finish));
        
        let editedPriorityText;
        if (editingPriority.value === 'veryImportant') {
          editedPriorityText = `Priority: Very-Important`;
        } else if (editingPriority.value === 'important') {
          editedPriorityText = `Priority: Important`;
        } else if (editingPriority.value === 'lessImportant') {
          editedPriorityText = `Priority: Less-Important`;
        }
        
        let editedCategorieText;
        if (editingCategorie.value === 'personal') {
          editedCategorieText = `Categorie: Personal`;
        } else if (editingCategorie.value === 'work') {
          editedCategorieText = `Categorie: Work`;
        } else if (editingCategorie.value === 'study') {
          editedCategorieText = `Categorie: Study`
        } else if (editingCategorie.value === 'health') {
          editedCategorieText = `Categorie: Health`
        } else if (editingCategorie.value === 'others') {
          editedCategorieText = `Categorie: Others`
        }
        
        todoTitle.textContent = `Task: ${editing.value}`;
        todoPriority.textContent = editedPriorityText;
        todoCategorie.textContent = editedCategorieText;
        
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
    editPriority.value = data.priorityValue;
    editCategorie.value = data.categorieValue;
    
    todoTitle.style.display = 'none';
    todoPriority.style.display = 'none';
    todoCategorie.style.display = 'none';
    
    item.prepend(editInput);
    item.prepend(editPriority);
    item.prepend(editCategorie);
    editInput.focus();
  }
  
  Delete(item) {
    const itemId = parseInt(item.getAttribute('id'));
    const data = this.myMap.get(itemId);
    if (itemId && data.finish === false) {
      this.totalText--;
      this.pendingText--;
      this.myMap.delete(itemId);
    } else if (itemId && data.finish === true) {
      this.totalText--;
      this.completedText--;
      this.myMap.delete(itemId);
    }
    item.remove();
    totalItems.textContent = `${this.totalText} Total items`;
    pendingItems.textContent = `${this.pendingText} Pending items`;
    completedItems.textContent = `${this.completedText} Completed items`;
  }
  
  Finish(item) {
    const itemId = parseInt(item.getAttribute('id'));
    const data = this.myMap.get(itemId);
    if (data.finish === false) {
      data.finish = true;
      this.completedText++;
      this.pendingText--;
      item.classList.add('finished');
    } else if (data.finish === true) {
      data.finish = false;
      this.completedText--;
      this.pendingText++;
      item.classList.remove('finished');
    }
    
    this.myMap.set(itemId, new TodoItem(data.text, data.priorityValue, data.categorieValue, data.date, data.finish));
    
    totalItems.textContent = `${this.totalText} Total items`;
    pendingItems.textContent = `${this.pendingText} Pending items`;
    completedItems.textContent = `${this.completedText} Completed items`;
  }
}

const todoList = new TodoList();

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
    todoList.addItem(stored_values.text, stored_values.priorityValue, stored_values.categorieValue, stored_values.date, stored_values.finish);
  }
}

function save() {
  localStorage.setItem('todo-list', JSON.stringify(getValues()));
}

function clearInput() {
  input.value = '';
  input.focus();
}

todoListDiv.addEventListener('click', handleClick);

buttonAdd.addEventListener('click', () => {
  const value = input.value;
  const priority = selectPriorities.value;
  const categorie = selectCategories.value;
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const date = [year, month, day];
  
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
  
  todoList.addItem(value, priority, categorie, date);
  save();
});

load();
