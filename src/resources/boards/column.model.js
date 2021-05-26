const { v4: uuid } = require('uuid');

/**
 * A column
 * @typedef {Object} Colunm
 * @property {string} id - The id
 * @property {string} title - The title
 * @property {number} order - The order
 */
class Colunm {
  constructor({ id = uuid(), title = 'Title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Colunm;
