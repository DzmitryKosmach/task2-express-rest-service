const createError = require('http-errors');
let { USERS } = require('./user.storage');
const { removeUserFromTasks } = require('../tasks/task.memory.repository');

/**
 * Returns all users
 * @returns {Promise<Array<User>>} Array of users
 */
const getAll = async () => USERS;

/**
 * Returns user by id
 * @param {string} id - User id
 * @returns {Promise<User>} User according to id
 * @throws {HttpError} if the user does not exist
 */
const getUser = async (id) => {
  const user = USERS.find((u) => u.id === id);

  if (!user) throw createError(404, `Couldn't find a user with id: ${id}`);

  return user;
};

/**
 * Saves a user into the storage
 * @param {User} user - user for saving
 * @returns {Promise<User>} the saved user
 */
const saveUser = async (user) => {
  USERS.push(user);
  return user;
};

/**
 * Updates a user in the storage
 * @param {User} user - user for updating
 * @returns {Promise<User>} the updated user
 * @throw {HttpError} if the user does not exist
 */
const updateUser = async (user) => {
  const userIndex = USERS.findIndex((u) => u.id === user.id);
  if (userIndex < 0) {
    throw createError(404);
  }
  USERS[userIndex] = user;
  return user;
};

/**
 * Removes a user from the storage
 * @param {string} id - User id
 * @returns {void}
 */
const removeUser = async (id) => {
  USERS = USERS.filter((u) => u.id !== id);
  removeUserFromTasks(id);
};

module.exports = { getAll, getUser, updateUser, saveUser, removeUser };
