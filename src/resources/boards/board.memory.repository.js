const createError = require('http-errors');
let { BOARDS } = require('./board.storage');
const { removeTasksByBoard } = require('../tasks/task.memory.repository');

const getAll = async () => BOARDS;

const getBoard = async (id) => {
  const board = BOARDS.find((b) => b.id === id);

  if (!board) throw createError(404);

  return board;
};

const saveBoard = async (board) => {
  BOARDS.push(board);
  return board;
};

const updateBoard = async (board) => {
  const boardIndex = BOARDS.findIndex((b) => b.id === board.id);
  if (boardIndex < 0) {
    throw createError(404);
  }
  BOARDS[boardIndex] = board;
  return board;
};

const removeBoard = async (id) => {
  const board = BOARDS.find((b) => b.id === id);
  if (!board) throw createError(404);
  BOARDS = BOARDS.filter((b) => b.id !== id);
  removeTasksByBoard(id);
};

module.exports = {
  getAll,
  getBoard,
  updateBoard,
  saveBoard,
  removeBoard,
};
