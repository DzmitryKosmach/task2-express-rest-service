const usersRepo = require('./user.memory.repository');

/**
 * Returns all users
 * @returns {Array<User>} Array of users
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns user by id
 * @param {string} id - User id
 * @returns {User} the user according to id
 */
const getById = (id) => usersRepo.getUser(id);

/**
 * Updates a user into the repository
 * @param {User} user - user for updating
 * @returns {User} the updated user
 */
const update = (user) => usersRepo.updateUser(user);

/**
 * Saves a user into the repository
 * @param {User} user - user for saving
 * @returns {User} the saved user
 */
const save = (user) => usersRepo.saveUser(user);

/**
 * Removes a user from the repository
 * @param  @param {string} id - User id
 * @returns {void}
 */
const remove = (id) => usersRepo.removeUser(id);

module.exports = { getAll, getById, save, update, remove };
