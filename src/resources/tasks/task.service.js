const taskRepo = require('./task.memory.repository');

const getAll = (boardId) => taskRepo.getAll(boardId);
const getById = (boardId, id) => taskRepo.getTask(boardId, id);
const update = (task) => taskRepo.updateTask(task);
const save = (boardId, task) => taskRepo.saveTask(boardId, task);
const remove = (id) => taskRepo.removeTask(id);

module.exports = { getAll, getById, save, update, remove };
