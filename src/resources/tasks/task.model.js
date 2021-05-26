const { v4: uuid } = require('uuid');

/**
 * A task
 * @typedef {Object} Task
 * @property {string} id - The id
 * @property {string} title - The title
 * @property {number} order - The order
 * @property {string} description - The description
 * @property {string} userId - The user id
 * @property {string} boardId - The board id
 * @property {string} columnId - The column id
 */
class Task {
  constructor({
    id = uuid(),
    title = 'Title',
    order = 0,
    description = 'Description',
    userId,
    boardId,
    columnId,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
