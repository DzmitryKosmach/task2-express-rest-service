import createError from 'http-errors';
import boardsStorage from './board.storage';
import { removeTasksByBoard } from '../tasks/task.memory.repository';
import Board from './board.model';

let {boards} = boardsStorage;

const getAll = async (): Promise<Array<Board>> => boards;

const getBoard = async (id: string): Promise<Board> => {
  const board = boards.find((b) => b.id === id);

  if (!board) throw createError(404);

  return board;
};

const saveBoard = async (board: Board): Promise<Board> => {
  boards.push(board);
  return board;
};

const updateBoard = async (board: Board): Promise<Board> => {
  const boardIndex = boards.findIndex((b) => b.id === board.id);
  if (boardIndex < 0) {
    throw createError(404);
  }
  boards[boardIndex] = board;
  return board;
};

const removeBoard = async (id: string): Promise<void> => {
  const board = boards.find((b) => b.id === id);
  if (!board) throw createError(404);
  boards = boards.filter((b) => b.id !== id);
  removeTasksByBoard(id);
};

export {
  getAll,
  getBoard,
  updateBoard,
  saveBoard,
  removeBoard,
};
