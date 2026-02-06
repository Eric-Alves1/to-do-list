class TodoList {
  /** @type {Map<string, TodoItem>} */
  idMap = new Map();

  /**
   * @param {string} value
   * @param {string} priority
   * @param {string} categorie
   * @param {boolean} done
   * @param {string} date
   * @returns {{id:string,item:TodoItem}}
   */
  addItem(value, priority, categorie, done, date) {
    AssertNotNullOrUndefined(value);
    AssertNotNullOrUndefined(priority);
    AssertNotNullOrUndefined(categorie);
    AssertNotNullOrUndefined(done);
    AssertNotNullOrUndefined(date);

    const id = GetUniqueId();
    const item = new TodoItem(value, priority, categorie, done, date);
    this.idMap.set(id, item);

    return { id, item };
  }

  /**
   * @param {string} id
   * @param {TodoItem} item
   * @returns {void}
   */
  editItem(id, item) {
    AssertNotNullOrUndefined(id);
    AssertNotNullOrUndefined(item);

    const mapItem = this.idMap.get(id);
    if (mapItem) {
      mapItem.value = item.value;
      mapItem.priority = item.priority;
      mapItem.categorie = item.categorie;
      mapItem.done = item.done;
      mapItem.date = item.date;
    }
  }

  /**
   * @param {string} id
   * @returns {void}
   */
  deleteItem(id) {
    AssertNotNullOrUndefined(id);

    this.idMap.delete(id);
  }

  deleteAllItems() {
    this.idMap.clear();
  }

  /**
   * @param {string} id
   * @returns {TodoItem|undefined}
   */
  getItemCopy(id) {
    AssertNotNullOrUndefined(id);

    const mapItem = this.idMap.get(id);
    if (mapItem) {
      return new TodoItem(mapItem.value, mapItem.priority, mapItem.categorie, mapItem.done, mapItem.date);
    }
  }

  /**
   * @returns {TodoItem[]}
   */
  getItemArray() {
    return Array.from(this.idMap.values());
  }

  /**
   * @returns {number}
   */
  get totalCount() {
    return this.idMap.size;
  }

  /**
   * @returns {number}
   */
  get pendingCount() {
    let count = 0;
    for (const [_id, item] of this.idMap) {
      if (item.done === false) {
        count += 1;
      }
    }
    return count;
  }

  /**
   * @returns {number}
   */
  get completedCount() {
    let count = 0;
    for (const [_id, item] of this.idMap) {
      if (item.done === true) {
        count += 1;
      }
    }
    return count;
  }
}
