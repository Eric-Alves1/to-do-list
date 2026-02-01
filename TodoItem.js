export class TodoItem {
  /**
   * @param {string} text
   * @param {string} priorityValue
   * @param {string} categorieValue
   * @param {string} date
   * @param {boolean} finish
   */
  constructor(text, priorityValue, categorieValue, done) {
    if (text === undefined || priorityValue === undefined || categorieValue === undefined || done === undefined) {
      throw new Error('An argument is missing!');
    }
    this.text = text;
    this.priorityValue = priorityValue;
    this.categorieValue = categorieValue;
    this.done = done;
  }
}
