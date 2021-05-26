const { v4: uuid } = require('uuid');
const Column = require('./column.model');

/**
 * A board
 * @typedef {Object} Board
 * @property {string} id - The id
 * @property {string} title - The title
 * @property {Array<Column>} columns - The columns
 */
class Board {
  constructor({ id = uuid(), title = 'Title', columns = [{ Column }] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => new Column(column));
  }
}

module.exports = Board;
