const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getUser(id);
const update = (user) => usersRepo.updateUser(user);
const save = (user) => usersRepo.saveUser(user);
const remove = (id) => usersRepo.removeUser(id);

module.exports = { getAll, getById, save, update, remove };
