const createError = require('http-errors');
let { USERS } = require('./user.storage');
const { removeUserFromTasks } = require('../tasks/task.memory.repository');

const getAll = async () => USERS;

const getUser = async (id) => {
  const user = USERS.find((u) => u.id === id);

  if (!user) throw createError(404, `Couldn't find a user with id: ${id}`);

  return user;
};

const saveUser = async (user) => {
  USERS.push(user);
  return user;
};

const updateUser = async (user) => {
  const userIndex = USERS.findIndex((u) => u.id === user.id);
  if (userIndex > -1) {
    USERS[userIndex] = user;
    return user;
  }
  return [];
};

const removeUser = async (id) => {
  USERS = USERS.filter((u) => u.id !== id);
  removeUserFromTasks(id);
};

module.exports = { getAll, getUser, updateUser, saveUser, removeUser };
