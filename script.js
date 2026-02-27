const input = IsInput(document.querySelector('#input'));
const buttonAdd = IsButton(document.querySelector('#new-task'));

const totalItemsText = IsP(document.querySelector('#totalItems'));
const pendingItemsText = IsP(document.querySelector('#pendingItems'));
const completedItemsText = IsP(document.querySelector('#completedItems'));

const selectPriorities = IsSelect(document.querySelector('#priority'));
const selectCategories = IsSelect(document.querySelector('#categorie'));

const orderSelectByItemTitle = IsSelect(document.querySelector('#orderItem'));
const orderSelectByItemPriority = IsSelect(document.querySelector('#orderPriority'));
const orderSelectByItemCategorie = IsSelect(document.querySelector('#orderCategorie'));
const orderSelectByItemDate = IsSelect(document.querySelector('#orderDate'));
const orderButton = IsButton(document.querySelector('#orderButton'));

const filterSelectByItemPriority = IsSelect(document.querySelector('#filterPriority'));
const filterSelectByItemCategorie = IsSelect(document.querySelector('#filterCategorie'));
const filterButton = IsButton(document.querySelector('#filterButton'));

const searchInput = IsInput(document.querySelector('#searchInput'));

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
   * @param {string} order
   */
  orderByItemTitle(order) {
    if (order === 'ascending') {
      sortTodoItems((itemA, itemB) => {
        return itemA.value.localeCompare(itemB.value);
      });
    }
    if (order === 'descending') {
      sortTodoItems((itemA, itemB) => {
        return itemB.value.localeCompare(itemA.value);
      });
    }
  }

  /**
   * @param {string} order
   */
  orderByItemPriority(order) {
    if (order === 'ascending') {
      sortTodoItems((itemA, itemB) => {
        return this.getPriorityWeight(itemA) - this.getPriorityWeight(itemB);
      });
    }
    if (order === 'descending') {
      sortTodoItems((itemA, itemB) => {
        return this.getPriorityWeight(itemB) - this.getPriorityWeight(itemA);
      });
    }
  }

  /**
   * @param {string} order
   */
  orderByItemCategorie(order) {
    if (order === 'ascending') {
      sortTodoItems((itemA, itemB) => {
        return itemA.categorie.localeCompare(itemB.categorie);
      });
    }
    if (order === 'descending') {
      sortTodoItems((itemA, itemB) => {
        return itemB.categorie.localeCompare(itemA.categorie);
      });
    }
  }

  /**
   * @param {string} order
   */
  orderByItemDate(order) {
    // for dates, it's the opposite of a-z, because older dates come first alphabetically
    if (order === 'ascending') {
      sortTodoItems((itemA, itemB) => {
        return itemB.date.localeCompare(itemA.date);
      });
    }
    if (order === 'descending') {
      sortTodoItems((itemA, itemB) => {
        return itemA.date.localeCompare(itemB.date);
      });
    }
  }

  /**
   * @param {string} value
   */
  searchItem(value) {
    const formattedValue = value.toLowerCase().trim();

    for (const { node, item } of getTodoListNodeItemPairs()) {
      const match = item.value.toLowerCase().trim().includes(formattedValue);
      node.style.setProperty('display', match ? 'block' : 'none');
    }
  }

  /**
   * @param {string} priorityValue
   * @param {string} categorieValue
   */
  filterItems(priorityValue, categorieValue) {
    const nodes = this.getNodes();

    // reset all nodes
    for (const node of nodes) {
      node.style.removeProperty('display');
    }

    // only filter if one of these is not "noFilter"
    if (priorityValue !== 'noFilter' || categorieValue !== 'noFilter') {
      for (const { node, item } of getTodoListNodeItemPairs()) {
        if (!(item.priority === priorityValue || item.categorie === categorieValue)) {
          node.style.setProperty('display', 'none');
        }
      }
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
  getPriorityWeight(item) {
    if (item.priority === 'veryImportant') {
      return 1;
    }
    if (item.priority === 'important') {
      return 2;
    }
    if (item.priority === 'lessImportant') {
      return 3;
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

  /**
   * @returns {HTMLElement[]}
   */
  getNodes() {
    return /**@type {HTMLElement[]}*/ (Array.from(todoListDiv.children));
  }
}

const todoDOM = new TodoDOM();
const todoList = new TodoList();

/**
 * Returns an array of {node, item} pairs, where `node` is from
 * todoDOM.getNodes(), and `item` is from todoList.idMap using the `id`
 * attribute of each `node`.
 * @returns {{node:HTMLElement, item:TodoItem}[]}
 */
function getTodoListNodeItemPairs() {
  const pairs = /**@type {{node:HTMLElement, item:TodoItem}[]}*/ ([]);
  for (const node of todoDOM.getNodes()) {
    const id = node.getAttribute('id');
    if (id) {
      const item = todoList.getItemCopy(id);
      if (item) {
        pairs.push({ node, item });
      }
    }
  }
  return pairs;
}

/**
 * @param {(itemA:TodoItem,itemB:TodoItem)=>number} compare_fn
 */
function sortTodoItems(compare_fn) {
  const pairs = getTodoListNodeItemPairs();
  pairs.sort((a, b) => {
    return compare_fn(a.item, b.item);
  });
  for (const { node } of pairs) {
    todoListDiv.append(node);
  }
}

function RenderItems() {
  for (const node of todoDOM.getNodes()) {
    node.style.setProperty('display', 'block');
  }
}

function ResetInput() {
  input.value = '';
  input.focus();
}

function UpdateTodoStats() {
  totalItemsText.textContent = `Total tasks: ${todoList.totalCount}`;
  pendingItemsText.textContent = `Pending tasks: ${todoList.pendingCount}`;
  completedItemsText.textContent = `Completed tasks: ${todoList.completedCount}`;
}

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
  todoDOM.orderByItemTitle(orderSelectByItemTitle.value);
  todoDOM.orderByItemPriority(orderSelectByItemPriority.value);
  todoDOM.orderByItemCategorie(orderSelectByItemCategorie.value);
  todoDOM.orderByItemDate(orderSelectByItemDate.value);
});

filterButton.addEventListener('click', () => {
  todoDOM.filterItems(filterSelectByItemPriority.value, filterSelectByItemCategorie.value);
});

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value;
  if (searchValue.trim() === '') {
    RenderItems();
    return;
  }
  todoDOM.searchItem(searchValue);
});

todoListDiv.addEventListener('click', (event) => {
  try {
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
  } catch {}
});

LoadTodoList();
