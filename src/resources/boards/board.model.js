const { v4: uuid } = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({ id = uuid(), title = 'Title', columns = [{ Column }] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => new Column(column));
  }
}

module.exports = Board;
