const boardsRepo = require('./board.memory.repository');

/**
 * Returns all boards
 * @returns {Promise<Array<Board>>} Array of boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Returns board by id
 * @param {string} id - Board id
 * @returns {Promise<Board>} Board according to id
 */
const getById = (id) => boardsRepo.getBoard(id);

/**
 * Updates a board in the repository
 * @param {Board} board for updating
 * @returns {Board} the updated board
 */
const update = (board) => boardsRepo.updateBoard(board);

/**
 * Saves a board into the repository
 * @param {Board} board - board for saving
 * @returns {Promise<Board>} the saved board
 */
const save = (board) => boardsRepo.saveBoard(board);

/**
 * Removes a board from the repository by id
 * @param {string} id - Board id
 * @returns {Promise<void>}
 */
const remove = (id) => boardsRepo.removeBoard(id);

module.exports = { getAll, getById, save, update, remove };
