const taskRepo = require('./task.memory.repository');

/**
 * Returns all tasks by board id
 * @returns {Promise<Array<Task>>} Array of tasks
 */
const getAll = (boardId) => taskRepo.getAll(boardId);

/**
 * Returns task by board id and task id
 * @param {string} boardId - Board id
 * @param {string} id - Task id
 * @returns {Promise<Task>} Task according to board id and task id
 */
const getById = (boardId, id) => taskRepo.getTask(boardId, id);

/**
 * Updates a task in the repository
 * @param {Task} task - task for updating
 * @returns {Promise<Task>} the updated task
 */
const update = (task) => taskRepo.updateTask(task);

/**
 * Saves a task into the repository by board id
 * @param {string} boardId - Board id
 * @param {Task} task - task for saving
 * @returns {Promise<Task>} the saved task
 */
const save = (boardId, task) => taskRepo.saveTask(boardId, task);

/**
 * Removes a task from the repository
 * @param {string} id - Task id
 * @returns {Promise<void>}
 */
const remove = (id) => taskRepo.removeTask(id);

module.exports = { getAll, getById, save, update, remove };
