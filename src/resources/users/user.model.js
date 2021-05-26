const { v4: uuid } = require('uuid');

/**
 * A user
 * @typedef {Object} User
 * @property {string} id - The id
 * @property {string} name - The name
 * @property {string} login - The login
 * @property {string} password - The password
 */
class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns a user without field "password"
   * @param {User} user - The user
   * @returns {Object} user without field "password"
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
