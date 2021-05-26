const createError = require('http-errors');
let { TASKS } = require('./task.storage');

/**
 * Returns all tasks by board id
 * @returns {Promise<Array<Task>>} Array of tasks
 */
const getAll = async (boardId) => {
  const tasks = TASKS.filter((task) => task.boardId === boardId);
  return tasks;
};

/**
 * Returns task by board id and task id
 * @param {sting} boardId - Board id
 * @param {sting} id - Task id
 * @returns {Promise<Task>} Task according to board id and task id
 * @throw {HttpError} if the task does not exist
 */
const getTask = async (boardId, id) => {
  const task = TASKS.filter((t) => t.boardId === boardId).find(
    (t) => t.id === id
  );

  if (!task) throw createError(404);

  return task;
};

/**
 * Saves a task into the storage by board id
 * @param {string} boardId - Board id
 * @param {Task} task - task for saving
 * @returns {Promise<Task>} the saved task
 */
const saveTask = async (boardId, task) => {
  const newTask = task;
  newTask.boardId = boardId;
  TASKS.push(newTask);
  return task;
};

/**
 * Updates a task in the storage
 * @param {Task} task - task for updating
 * @returns {Promise<Task>} the updated task
 * @throw {HttpError} if the task do not exists
 */
const updateTask = async (task) => {
  const taskIndex = TASKS.findIndex((t) => t.id === task.id);
  if (taskIndex < 0) {
    throw createError(400);
  }
  TASKS[taskIndex] = task;
  return task;
};

/**
 * Removes a task from the storage by id
 * @param {string} id - Task id
 * @returns {void}
 */
const removeTask = async (id) => {
  if (!getTask(id)) throw createError(404);
  TASKS = TASKS.filter((t) => t.id !== id);
};

/**
 * Removes tasks from the storage by board
 * @param {string} id - Board id
 * @returns {void}
 */
const removeTasksByBoard = async (id) => {
  TASKS = TASKS.filter((t) => t.boardId !== id);
};

/**
 * Remove a user in all tasks
 * @param {string} id - User id
 * @returns {void}
 */
const removeUserFromTasks = async (id) => {
  TASKS.forEach((task) => {
    const currentTask = task;
    if (task.userId === id) currentTask.userId = null;
  });
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
