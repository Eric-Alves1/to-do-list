let id = 0;
let totalTasks = 0;
let pendingTasks = 0;
let completedTasks = 0;

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