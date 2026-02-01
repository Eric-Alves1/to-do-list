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
    const data = myMap.get(id.toString());
    
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
    if (data.done === true) {
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
  
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button-edit');
    buttonEdit.textContent = 'Edit';
  
    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button-delete');
    buttonDelete.textContent = 'Delete';
  
    const buttonFinish = document.createElement('button');
    buttonFinish.classList.add('button-finish');
    buttonFinish.textContent = 'Finish';
  
    //edit area
    let editing = item.querySelector('.edit-input');
    let editingPriority = item.querySelector('.edit-priority');
    let editingCategorie = item.querySelector('.edit-categorie');
  
    const todoTitle = item.querySelector('h3');
    const todoPriority = item.querySelector('.todo-priority');
    const todoCategorie = item.querySelector('.todo-categorie');
  
    const itemId = item.getAttribute('id');
  
    todoTitle.textContent = `Task: ${editing.value}`;
    todoPriority.textContent = newPriorityText;
    todoCategorie.textContent = newCategorieText;
  
    todoTitle.style.display = 'block';
    todoPriority.style.display = 'block';
    todoCategorie.style.display = 'block';
  
    editing.remove();
    editingPriority.remove();
    editingCategorie.remove();
    
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
    //end of edit area
    
    //delete area
    item.remove();
    totalItemsText.textContent = `${totalTasks} Total items`;
    pendingItemsText.textContent = `${pendingTasks} Pending items`;
    completedItemsText.textContent = `${completedTasks} Completed items`
    //end of delete area
    
    //finish area
    item.classList.add('finished');
    
    item.classList.remove('finished');
    pendingItemsText.textContent = `${pendingTasks} Pending items`
    completedItemsText.textContent = `${completedTasks} Completed items`
    //end of finish area
    
    todoContainer.appendChild(todoTitle);
    todoContainer.appendChild(todoPriority);
    todoContainer.appendChild(todoCategorie);
    todoContainer.appendChild(buttonEdit);
    todoContainer.appendChild(buttonDelete);
    todoContainer.appendChild(buttonFinish);
  
    todoListDiv.appendChild(todoContainer);
  }
}

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

function save() {
  localStorage.setItem('todo-list', JSON.stringify(getValues()));
}

function load() {
  for (const stored_values of JSON.parse(localStorage.getItem('todo-list') ?? '[]')) {
    todoList.addItem(stored_values.value, stored_values.priorityValue, stored_values.categorieValue, stored_values.done);
  }
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
