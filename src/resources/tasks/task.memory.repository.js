const createError = require('http-errors');
let { TASKS } = require('./task.storage');

const getAll = async (boardId) => {
  const tasks = TASKS.filter((task) => task.boardId === boardId);
  return tasks;
};

const getTask = async (boardId, id) => {
  const task = TASKS.filter((t) => t.boardId === boardId).find(
    (t) => t.id === id
  );

  if (!task) throw createError(404);

  return task;
};

const saveTask = async (boardId, task) => {
  const newTask = task;
  newTask.boardId = boardId;
  TASKS.push(newTask);
  return task;
};

const updateTask = async (task) => {
  const taskIndex = TASKS.findIndex((t) => t.id === task.id);
  if (taskIndex < 0) {
    throw createError(400);
  }
  TASKS[taskIndex] = task;
  return task;
};

const removeTask = async (id) => {
  if (!getTask(id)) throw createError(404);
  TASKS = TASKS.filter((t) => t.id !== id);
};

const removeTasksByBoard = async (id) => {
  TASKS = TASKS.filter((t) => t.boardId !== id);
};

const removeUserFromTasks = async (id) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const task of TASKS) {
    if (task.userId === id) task.userId = null;
  }
};

module.exports = {
  getAll,
  getTask,
  updateTask,
  saveTask,
  removeTask,
  removeTasksByBoard,
  removeUserFromTasks,
};
