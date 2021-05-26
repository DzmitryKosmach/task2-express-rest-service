const createError = require('http-errors');
let { BOARDS } = require('./board.storage');
const { removeTasksByBoard } = require('../tasks/task.memory.repository');

/**
 * Returns all boards
 * @returns {Promise<Array<Board>>} Array of boards
 */
const getAll = async () => BOARDS;

/**
 * Returns board by id
 * @param {string} id - Board id
 * @returns {Promise<Board>} Board according to id
 * @throws {HttpError} if the board does not exist
 */
const getBoard = async (id) => {
  const board = BOARDS.find((b) => b.id === id);

  if (!board) throw createError(404);

  return board;
};

/**
 * Saves a board into the storage
 * @param {Board} board - board for saving
 * @returns {Promise<Board>} the saved board
 */
const saveBoard = async (board) => {
  BOARDS.push(board);
  return board;
};

/**
 * Updates a board in the storage
 * @param {Board} board - board for updating
 * @returns {Promise<Board>} the updated board
 * @throw {HttpError} if the board does not exist
 */
const updateBoard = async (board) => {
  const boardIndex = BOARDS.findIndex((b) => b.id === board.id);
  if (boardIndex < 0) {
    throw createError(404);
  }
  BOARDS[boardIndex] = board;
  return board;
};

/**
 * Removes a board from the storage
 * @param {string} id - Board id
 * @throw {HttpError} if the board does not exist
 * @returns {void}
 */
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
