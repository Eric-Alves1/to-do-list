const input = IsInput(document.querySelector('#input'));
const buttonAdd = IsButton(document.querySelector('#new-task'));

const totalItemsText = IsP(document.querySelector('#totalItems'));
const pendingItemsText = IsP(document.querySelector('#pendingItems'));
const completedItemsText = IsP(document.querySelector('#completedItems'));

const selectPriorities = IsSelect(document.querySelector('#priority'));
const selectCategories = IsSelect(document.querySelector('#categorie'));

const selectByItemTitle = IsSelect(document.querySelector('#orderItem'));
const selectByItemPriority = IsSelect(document.querySelector('#orderPriority'));
const selectByItemCategorie = IsSelect(document.querySelector('#orderCategorie'));
const selectByItemDate = IsSelect(document.querySelector('#orderDate'));
const orderButton = IsButton(document.querySelector('#orderButton'));

const todoListDiv = IsDiv(document.querySelector('#todo-list'));

class TodoDOM {
  /**
   * @param {string} id
   * @param {TodoItem} item
   */
  addNode(id, item) {
    AssertNotNullOrUndefined(id);
    AssertNotNullOrUndefined(item);

    const divItem = document.createElement('div');
    divItem.classList.add('todo-item');
    if (item.done === true) {
      divItem.classList.add('finished');
    }
    divItem.setAttribute('id', id);

    const h3Title = document.createElement('h3');
    h3Title.classList.add('todo-title');
    h3Title.textContent = this.getTitleText(item);

    const h3Priority = document.createElement('h3');
    h3Priority.classList.add('todo-priority');
    h3Priority.textContent = this.getPriorityText(item);

    const h3Categorie = document.createElement('h3');
    h3Categorie.classList.add('todo-categorie');
    h3Categorie.textContent = this.getCategorieText(item);

    const h3Date = document.createElement('h3');
    h3Date.classList.add('todo-date');
    h3Date.textContent = this.getDateText(item);

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button-edit');
    buttonEdit.textContent = 'Edit';

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button-delete');
    buttonDelete.textContent = 'Delete';

    const buttonFinish = document.createElement('button');
    buttonFinish.classList.add('button-finish');
    buttonFinish.textContent = 'Finish';

    divItem.appendChild(h3Title);
    divItem.appendChild(h3Priority);
    divItem.appendChild(h3Categorie);
    divItem.appendChild(h3Date);
    divItem.appendChild(buttonEdit);
    divItem.appendChild(buttonDelete);
    divItem.appendChild(buttonFinish);

    todoListDiv.appendChild(divItem);
  }

  /**
   * @param {TodoItem} item
   * @param {HTMLDivElement} divItem
   */
  editNode(item, divItem) {
    AssertNotNullOrUndefined(item);
    AssertNotNullOrUndefined(divItem);

    const h3Title = IsH(divItem.querySelector('h3.todo-title'));
    const h3Priority = IsH(divItem.querySelector('h3.todo-priority'));
    const h3Categorie = IsH(divItem.querySelector('h3.todo-categorie'));

    if (!divItem.classList.contains('editing')) {
      divItem.classList.add('editing');

      h3Title.style.setProperty('display', 'none');
      h3Priority.style.setProperty('display', 'none');
      h3Categorie.style.setProperty('display', 'none');

      const inputEdit = document.createElement('input');
      inputEdit.classList.add('edit-input');
      inputEdit.value = item.value;

      const selectEditPriority = IsSelect(selectPriorities.cloneNode(true));
      selectEditPriority.classList.add('edit-priority');
      selectEditPriority.value = item.priority;

      const selectEditCategorie = IsSelect(selectCategories.cloneNode(true));
      selectEditCategorie.classList.add('edit-categorie');
      selectEditCategorie.value = item.categorie;

      divItem.prepend(inputEdit);
      divItem.prepend(selectEditCategorie);
      divItem.prepend(selectEditPriority);

      inputEdit.focus();
    } else {
      const inputEdit = IsInput(divItem.querySelector('.edit-input'));
      const selectEditPriority = IsSelect(divItem.querySelector('.edit-priority'));
      const selectEditCategorie = IsSelect(divItem.querySelector('.edit-categorie'));

      if (inputEdit.value.trim() === '' || selectEditPriority.value === '' || selectEditCategorie.value === '') {
        alert('you must change something!');
      } else {
        divItem.classList.remove('editing');

        item.value = inputEdit.value;
        item.priority = selectEditPriority.value;
        item.categorie = selectEditCategorie.value;

        h3Title.textContent = this.getTitleText(item);
        h3Priority.textContent = this.getPriorityText(item);
        h3Categorie.textContent = this.getCategorieText(item);

        h3Title.style.removeProperty('display');
        h3Priority.style.removeProperty('display');
        h3Categorie.style.removeProperty('display');

        inputEdit.remove();
        selectEditPriority.remove();
        selectEditCategorie.remove();
      }
    }
  }

  /**
   * @param {HTMLDivElement} divItem
   */
  deleteNode(divItem) {
    AssertNotNullOrUndefined(divItem);

    divItem.remove();
  }

  /**
   * @param {string} id
   * @param {TodoItem} item
   * @param {HTMLDivElement} divItem
   */
  finishNode(id, item, divItem) {
    AssertNotNullOrUndefined(id);
    AssertNotNullOrUndefined(item);
    AssertNotNullOrUndefined(divItem);

    item.done = !item.done;
    divItem.classList.toggle('finished', item.done);
  }
  
  /**
   * @param {string} selectedOrderTitle
   */
  orderByItemTitle(selectedOrderTitle) {
    if (selectedOrderTitle === 'noOrder') {
      return;
    }
    
    const sortedByTitle = Array.from(todoListDiv.children);
    if (selectedOrderTitle === 'a-z') {
      sortedByTitle.sort((node_a, node_b) => {
        const titleA = node_a.querySelector('h3.todo-title')?.textContent;
        const titleB = node_b.querySelector('h3.todo-title')?.textContent;
        
        return titleA.localeCompare(titleB);
      });
    } else if (selectedOrderTitle === 'z-a') {
        sortedByTitle.sort((node_a, node_b) => {
        const titleA = node_a.querySelector('h3.todo-title')?.textContent;
        const titleB = node_b.querySelector('h3.todo-title')?.textContent;
        
        return titleB.localeCompare(titleA);
      });
    }
    
    for (let i = 0; i < sortedByTitle.length; i++) {
      todoListDiv.append(sortedByTitle[i]);
    }
  }
  
  /**
   * @param {string} selectedOrderPriority
   */
  orderByItemPriority(selectedOrderPriority) {
    if (selectedOrderPriority === 'noOrder') {
      return;
    }
    
    const sortedByPriority = Array.from(todoListDiv.children);
    if (selectedOrderPriority === 'm-l') {
      sortedByPriority.sort((node_a, node_b) => {
        let priorityWeightA;
        let priorityWeightB;
        const priorityA = node_a.querySelector('h3.todo-priority')?.textContent;
        const priorityB = node_b.querySelector('h3.todo-priority')?.textContent;
        
        if (priorityA === ' Priority: Very-Important') {
          priorityWeightA = 1;
        } else if (priorityA === ' Priority: Important') {
          priorityWeightA = 2;
        } else if (priorityA === ' Priority: Less-Important') {
          priorityWeightA = 3;
        }
        
        if (priorityB === ' Priority: Very-Important') {
          priorityWeightB = 1;
        } else if (priorityB === ' Priority: Important') {
          priorityWeightB = 2;
        } else if (priorityB === ' Priority: Less-Important') {
          priorityWeightB = 3;
        }        
        return priorityWeightA - priorityWeightB;
      });
    } else if (selectedOrderPriority === 'l-m') {
      sortedByPriority.sort((node_a, node_b) => {
        let priorityWeightA;
        let priorityWeightB;
        const priorityA = node_a.querySelector('h3.todo-priority')?.textContent;
        const priorityB = node_b.querySelector('h3.todo-priority')?.textContent;
        
        if (priorityA === ' Priority: Very-Important') {
          priorityWeightA = 1;
        } else if (priorityA === ' Priority: Important') {
          priorityWeightA = 2;
        } else if (priorityA === ' Priority: Less-Important') {
          priorityWeightA = 3;
        }
        
        if (priorityB === ' Priority: Very-Important') {
          priorityWeightB = 1;
        } else if (priorityB === ' Priority: Important') {
          priorityWeightB = 2;
        } else if (priorityB === ' Priority: Less-Important') {
          priorityWeightB = 3;
        }        
        return priorityWeightB - priorityWeightA;
      });
    }
    for (let i = 0; i < sortedByPriority.length; i++) {
      todoListDiv.append(sortedByPriority[i]);
    }
  }
  
  /**
   * @param {string} selectedOrderCategorie
   */
  orderByItemCategorie(selectedOrderCategorie) {
    if (selectedOrderCategorie === 'noOrder') {
      return;
    }
    
    const sortedByCategorie = Array.from(todoListDiv.children);
    if (selectedOrderCategorie === 'a-z') {
      sortedByCategorie.sort((node_a, node_b) => {
        const categorieA = node_a.querySelector('h3.todo-categorie')?.textContent;
        const categorieB = node_b.querySelector('h3.todo-categorie')?.textContent;
        
        return categorieA.localeCompare(categorieB)
      });
    } else if (selectedOrderCategorie === 'z-a') {
      sortedByCategorie.sort((node_a, node_b) => {
        const categorieA = node_a.querySelector('h3.todo-categorie')?.textContent;
        const categorieB = node_b.querySelector('h3.todo-categorie')?.textContent;
        
        return categorieB.localeCompare(categorieA)
      });
    }
    for (let i = 0; i < sortedByCategorie.length; i++) {
     todoListDiv.append(sortedByCategorie[i]);
    }
  }
  
  /**
   * @param {string} selectedOrderDate
   */
  orderByItemDate(selectedOrderDate) {
    if (selectedOrderDate === 'noOrder') {
      return;
    }
    
    const sortedByDate = Array.from(todoListDiv.children);
    if (selectedOrderDate === 'first-last') {
      sortedByDate.sort((node_a, node_b) => {
        const dateA = node_a.querySelector('h3.todo-date')?.textContent;
        const dateB = node_b.querySelector('h3.todo-date')?.textContent;
        return new Date(dateA) - new Date(dateB);
      });
    } else if (selectedOrderDate === 'last-first') {
      sortedByDate.sort((node_a, node_b) => {
        const dateA = node_a.querySelector('h3.todo-date')?.textContent;
        const dateB = node_b.querySelector('h3.todo-date')?.textContent;
        return new Date(dateB) - new Date(dateA);
    });
    }
    for (let i = 0; i < sortedByDate.length; i++) {
     todoListDiv.append(sortedByDate[i]);
    }
  }
  
  /**
   * @param {TodoItem} item
   */
  getTitleText(item) {
    return `Task: ${item.value}`;
  }

  /**
   * @param {TodoItem} item
   */
  getPriorityText(item) {
    if (item.priority === 'veryImportant') {
      return ' Priority: Very-Important';
    }
    if (item.priority === 'important') {
      return ' Priority: Important';
    }
    if (item.priority === 'lessImportant') {
      return ' Priority: Less-Important';
    }
    throw new Error('Unexpected priority value');
  }

  /**
   * @param {TodoItem} item
   */
  getCategorieText(item) {
    if (item.categorie === 'personal') {
      return ' Categorie: Personal';
    }
    if (item.categorie === 'work') {
      return ' Categorie: Work';
    }
    if (item.categorie === 'study') {
      return ' Categorie: Study';
    }
    if (item.categorie === 'health') {
      return ' Categorie: Health';
    }
    if (item.categorie === 'others') {
      return ' Categorie: Others';
    }
    throw new Error('Unexpected categorie value');
  }

  /**
   * @param {TodoItem} item
   */
  getDateText(item) {
    const date = new Date(item.date);
    const year = date.getFullYear().toString(10);
    const month = (date.getMonth() + 1).toString(10).padStart(2, '0');
    const day = date.getDate().toString(10).padStart(2, '0');
    return `Date: ${year}/${month}/${day}`;
  }
}

const todoDOM = new TodoDOM();
const todoList = new TodoList();

function ResetInput() {
  input.value = '';
  input.focus();
}

function UpdateTodoStats() {
  totalItemsText.textContent = `${todoList.totalCount} Total items`;
  pendingItemsText.textContent = `${todoList.pendingCount} Pending Items`;
  completedItemsText.textContent = `${todoList.completedCount} Completed items`;
}

/*
function deleteTodoListChildrens() {
  
}
*/

function SaveTodoList() {
  localStorage.setItem('todo-list', JSON.stringify(todoList.getItemArray()));
}

function LoadTodoList() {
  const data = localStorage.getItem('todo-list');
  if (data) {
    /** @type {TodoItem[]} */
    const itemArray = JSON.parse(data);
    for (const { value, priority, categorie, done, date } of itemArray) {
      const { id, item } = todoList.addItem(value, priority, categorie, done, date);
      todoDOM.addNode(id, item);
      UpdateTodoStats();
    }
  }
}

buttonAdd.addEventListener('click', () => {
  const value = input.value;
  const priority = selectPriorities.value;
  const categorie = selectCategories.value;
  const date = new Date().toISOString();

  if (value.trim() === '') {
    alert('you must write something!');
    return;
  }

  if (priority === '') {
    alert('you must choose a priority!');
    return;
  }

  if (categorie === '') {
    alert('you must choose a categorie');
    return;
  }

  const { id, item } = todoList.addItem(value, priority, categorie, false, date);
  todoDOM.addNode(id, item);
  ResetInput();
  UpdateTodoStats();
  SaveTodoList();
});

orderButton.addEventListener('click', () => {
  const selectedOrderTitle = selectByItemTitle.value;
  const selectedOrderPriority = selectByItemPriority.value;
  const selectedOrderCategorie = selectByItemCategorie.value;
  const selectedOrderDate = selectByItemDate.value;
  
  
  todoDOM.orderByItemTitle(selectedOrderTitle);
  todoDOM.orderByItemPriority(selectedOrderPriority);
  todoDOM.orderByItemCategorie(selectedOrderCategorie);
  todoDOM.orderByItemDate(selectedOrderDate);
});

todoListDiv.addEventListener('click', (event) => {
  const button = IsButton(event.target);
  const divItem = IsDiv(button.closest('.todo-item'));

  const id = divItem.getAttribute('id');
  const item = id ? todoList.getItemCopy(id) : undefined;

  if (id && item) {
    if (button.classList.contains('button-edit')) {
      todoDOM.editNode(item, divItem);
      todoList.editItem(id, item);
    } else if (button.classList.contains('button-delete')) {
      todoDOM.deleteNode(divItem);
      todoList.deleteItem(id);
    } else if (button.classList.contains('button-finish')) {
      todoDOM.finishNode(id, item, divItem);
      todoList.editItem(id, item);
    }
    UpdateTodoStats();
    SaveTodoList();
  }
});

LoadTodoList();
