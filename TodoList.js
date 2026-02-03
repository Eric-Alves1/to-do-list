import { TodoItem } from './TodoItem.js';
import { AssertNotNullOrUndefined, GetUniqueId } from './utility.js';

/** EDIT:
 * Keeping track of tasks this way is a bit sloppy and error prone. Instead, we
 * can write some getting methods that calculate these values when they are
 * needed.
 */
// let totalTasks = 0;
// let pendingTasks = 0;
// let completedTasks = 0;

export class TodoList {
  /** EDIT:
   * Naming is important! Changed this to something more meaningful. Also, we
   * can add type information using jsdocs.
   */
  /** @type {Map<string, TodoItem>} */
  idMap = new Map();

  /**
   * @param {string} value
   * @param {string} priority
   * @param {string} categorie
   * @param {boolean} done
   * @returns {{id:string,item:TodoItem}}
   */
  addItem(value, priority, categorie, done) {
    AssertNotNullOrUndefined(value);
    AssertNotNullOrUndefined(priority);
    AssertNotNullOrUndefined(categorie);
    AssertNotNullOrUndefined(done);

    /** EDIT:
     * No longer needed.
     */
    // totalTasks++;
    // pendingTasks++;

    /** EDIT:
     * Can't do this here. This needs to be done in the TodoDOM class.
     */
    // todoDom.createDom(id, value, priority, categorie);
    // clearInput();

    const id = GetUniqueId();
    const item = new TodoItem(value, priority, categorie, done);
    this.idMap.set(id, item);

    return { id, item };
  }

  /** EDIT:
   * All other functions must rely on the `id` only.
   */

  /**
   * Updates map item with values from item parameter.
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

  /**
   * Returns a deep copy of the map item if id exists.
   * @param {string} id
   * @returns {TodoItem|undefined}
   */
  getItemCopy(id) {
    AssertNotNullOrUndefined(id);

    const mapItem = this.idMap.get(id);
    if (mapItem) {
      return new TodoItem(mapItem.value, mapItem.priority, mapItem.categorie, mapItem.done);
    }
  }

  /**
   * @returns {TodoItem[]}
   */
  getItemArray() {
    return Array.from(this.idMap.values());
  }

  /** EDIT:
   * Getter methods for retrieving item counts.
   */

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
