const { v4: uuid } = require('uuid');

class Colunm {
  constructor({ id = uuid(), title = 'Title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Colunm;
