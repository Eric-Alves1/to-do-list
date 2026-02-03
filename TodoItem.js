import { AssertNotNullOrUndefined } from './utility.js';

/** EDIT:
 * Changing the properties to match TodoList.addItem parameters.
 */

export class TodoItem {
  /**
   * @param {string} value
   * @param {string} priority
   * @param {string} categorie
   * @param {boolean} done
   */
  constructor(value, priority, categorie, done) {
    AssertNotNullOrUndefined(value);
    AssertNotNullOrUndefined(priority);
    AssertNotNullOrUndefined(categorie);
    AssertNotNullOrUndefined(done);

    this.value = value;
    this.priority = priority;
    this.categorie = categorie;
    this.done = done;
  }
}
