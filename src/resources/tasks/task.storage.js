const { USERS } = require('../users/user.storage');
const { BOARDS } = require('../boards/board.storage');
const Task = require('./task.model');

const TASKS = [
  new Task({
    title: 'Title Task',
    order: 0,
    description: 'Description Task',
    userId: USERS[0].id,
    boardId: BOARDS[0].id,
    columnId: BOARDS[0].columns[0].id,
  }),
  new Task({
    title: 'Title Task',
    order: 0,
    description: 'Description Task',
    userId: USERS[1].id,
    boardId: BOARDS[1].id,
    columnId: BOARDS[1].columns[0].id,
  }),
];

module.exports = { TASKS };
