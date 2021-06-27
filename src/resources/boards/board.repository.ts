import { getConnection, getRepository } from 'typeorm';
import createError from 'http-errors';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';

import { removeTasksByBoard } from '../tasks/task.repository';
import Board from '../../entities/board';
import { BoardDTO } from '../../common/types';
import ColunmBoard from '../../entities/column_board';

const getAll = async (): Promise<Board[]> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find({relations: ['columns'], });
};

const getBoardById = async (id: string): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id, {relations: ['columns'], });
  if (!board) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  return board;
};

const createBoard = async (dto: BoardDTO):Promise<Board> => {
  const boardRepository = getRepository(Board);
  const newBoard = boardRepository.create(dto);  
  const savedBoard = boardRepository.save(newBoard);  
  return savedBoard;  
};

const updateBoard = async (id: string, dto: BoardDTO):Promise<Board> => {
  const boardRepository = getRepository(Board);  
  const board = await getBoardById(id);
  if(!board) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  const preUpdateBoard = boardRepository.create(dto);
  preUpdateBoard.id = id;
  const updatedBoard = await boardRepository.save(preUpdateBoard);  
  return updatedBoard;  
};


const deleteBoard = async (id: string): Promise<'DELETED'> => {
  const boardRepository = getRepository(Board); 
  getConnection()
    .createQueryBuilder()
    .delete()
    .from(ColunmBoard)
    .where("boardId = :id", { id: `${id}` })
    .execute();

  const deletionRes = await boardRepository.delete(id);
  if(!deletionRes.affected) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  removeTasksByBoard(id);
  return 'DELETED';
};

export {
  getAll,
  getBoardById,
  updateBoard,
  createBoard,  
  deleteBoard,
};
