const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getBoard(id);
const update = (board) => boardsRepo.updateBoard(board);
const save = (board) => boardsRepo.saveBoard(board);
const remove = (id) => boardsRepo.removeBoard(id);

module.exports = { getAll, getById, save, update, remove };
