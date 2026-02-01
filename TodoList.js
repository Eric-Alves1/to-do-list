import { GetUniqueId } from './utility.js';
import { TodoItem } from './TodoItem.js';
let totalTasks = 0;
let pendingTasks = 0;
let completedTasks = 0;

class TodoList {
  myMap = new Map();
  
  addItem(value, priority, categorie, done = false) {
    const id = GetUniqueId();
    totalTasks++;
    pendingTasks++;
  
    myMap.set(id, new TodoItem(value, priority, categorie, done));
  
    todoDom.createDom(id, value, priority, categorie);
    clearInput();
  }
  
  editItem(item) {
    
    const data = this.myMap.get(itemId);
  
    if (editing) {
      if (editing.value.trim() === '' || editingPriority.value === '' || editingCategorie.value === '') {
        alert('you must change something!');
        return;
      }
      
      todoItem(editing.value, editingPriority.value, editingCategorie.value)
      
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
      return;
    }
    editInput.focus();
  }
  
  deleteItem(item) {
    const itemId = item.getAttribute('id');
    const data = this.myMap.get(itemId);
    if (itemId && data.done === false) {
      totalTasks--;
      pendingTasks--;
      this.myMap.delete(itemId);
    } else if (itemId && data.done === true) {
      totalTasks--;
      completedTasks--;
      this.myMap.delete(itemId);
    }
  }
  
  finishItem(item) {
    const itemId = item.getAttribute('id');
    let data = this.myMap.get(itemId);
    if (data.done === false) {
      data.done = true;
      completedTasks++;
      pendingTasks--;
    } else if (data.done === true) {
      data.done = false;
      completedTasks--;
      pendingTasks++;
    }
    
    myMap.set(itemId, new TodoItem(data.value, data.priorityValue, data.categorieValue, data.done));
  }
}