class TodoItem {
  constructor(text, priorityValue, categorieValue, date, finish) {
    if (text === undefined || priorityValue === undefined || categorieValue === undefined || finish === undefined || date === undefined) {
      throw new Error('An argument is missing!');
    }
    this.text = text;
    this.priorityValue = priorityValue;
    this.categorieValue = categorieValue;
    this.date = date;
    this.finish = finish;
  }
}
