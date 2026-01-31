//<span class="material-symbols-outlined">delete</span>
const input = /** @type {HTMLInputElement} */ (document.querySelector('#input'));
const addButton = /** @type {HTMLButtonElement} */ (document.querySelector('#new-task'));
const todoListDiv = /** @type {HTMLDivElement} */ (document.querySelector('#todo-list'));

/**
 * @param {string} id
 * @param {string} value
 */
function createDOMTodoItem(id, value) {
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('todo-item');
  itemContainer.setAttribute('id', id);

  const itemTitle = document.createElement('h3');
  itemTitle.classList.add('todo-title');
  itemTitle.textContent = value;

  const editButton = document.createElement('button');
  editButton.classList.add('button-edit');
  editButton.textContent = 'Edit';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('button-delete');
  deleteButton.textContent = 'Delete';

  const finishButton = document.createElement('button');
  finishButton.classList.add('button-finish');
  finishButton.textContent = 'Finish';

  itemContainer.appendChild(itemTitle);
  itemContainer.appendChild(editButton);
  itemContainer.appendChild(deleteButton);
  itemContainer.appendChild(finishButton);

  return itemContainer;
}

class TodoList {
  nextId = 0;

  /** @type {Map<string,string>} */
  idMap = new Map();

  getValues() {
    return Array.from(this.idMap.values());
  }

  /** @param {string} itemValue */
  addItem(itemValue) {
    const itemId = this.nextId.toString();
    this.nextId++;
    this.idMap.set(itemId, itemValue);
    return createDOMTodoItem(itemId, itemValue);
  }

  /** @param {HTMLDivElement} itemDiv */
  editItem(itemDiv) {
    const itemTitle = itemDiv.querySelector('h3');
    if (itemTitle) {
      const editInput = itemDiv.querySelector('input');
      if (editInput) {
        if (editInput.value.trim() === '') {
          alert('you must write something!');
        } else {
          const itemId = itemDiv.getAttribute('id');
          const itemValue = editInput.value;
          if (itemId) {
            this.idMap.set(itemId, itemValue);
            itemTitle.textContent = itemValue;
            itemTitle.style.display = 'block';
            editInput.remove();
          }
        }
      } else {
        const editInput = document.createElement('input');
        editInput.classList.add('input-edit');
        editInput.value = itemTitle.textContent;
        itemTitle.style.display = 'none';
        itemDiv.insertBefore(editInput, itemTitle);
        editInput.focus();
      }
    }
  }

  /** @param {HTMLDivElement} itemDiv */
  deleteItem(itemDiv) {
    const itemId = itemDiv.getAttribute('id');
    if (itemId) {
      this.idMap.delete(itemId);
    }
    itemDiv.remove();
  }

  /** @param {HTMLDivElement} itemDiv */
  finishItem(itemDiv) {
    itemDiv.classList.toggle('finished');
  }
}

const todoList = new TodoList();

function clearInput() {
  input.value = '';
  input.focus();
}

/** @param {Event} event */
function handleClick(event) {
  if (event.target instanceof Element) {
    const div = event.target.closest('.todo-item');
    if (div instanceof HTMLDivElement) {
      if (event.target.classList.contains('button-edit')) {
        todoList.editItem(div);
      } else if (event.target.classList.contains('button-delete')) {
        todoList.deleteItem(div);
      } else if (event.target.classList.contains('button-finish')) {
        todoList.finishItem(div);
      }
      save();
    }
  }
}

function load() {
  for (const stored_value of JSON.parse(localStorage.getItem('todo-list') ?? '[]')) {
    todoListDiv.appendChild(todoList.addItem(stored_value));
    clearInput();
  }
}

function save() {
  localStorage.setItem('todo-list', JSON.stringify(todoList.getValues()));
}

todoListDiv.addEventListener('click', handleClick);

addButton.addEventListener('click', () => {
  if (input.value.trim() === '') {
    alert('you must write something!');
    return;
  }
  todoListDiv.appendChild(todoList.addItem(input.value));
  clearInput();
  save();
});

load();