class TodoItem {
  /**
   * @param {string} value
   * @param {string} priority
   * @param {string} categorie
   * @param {boolean} done
   * @param {string} date
   */
  constructor(value, priority, categorie, done, date) {
    AssertNotNullOrUndefined(value);
    AssertNotNullOrUndefined(priority);
    AssertNotNullOrUndefined(categorie);
    AssertNotNullOrUndefined(done);
    AssertNotNullOrUndefined(date);

    this.value = value;
    this.priority = priority;
    this.categorie = categorie;
    this.done = done;
    this.date = date;
  }
}
