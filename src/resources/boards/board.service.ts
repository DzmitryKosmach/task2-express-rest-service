import * as boardsRepo from'./board.repository';
import Board from '../../entities/board';
import { BoardDTO } from '../../common/types';

const getAll = (): Promise<Array<Board>> => boardsRepo.getAll();

const getById = (id: string): Promise<Board> => boardsRepo.getBoardById(id);

const update = (id: string, dto: BoardDTO): Promise<Board> => boardsRepo.updateBoard(id, dto);

const create = (dto: BoardDTO): Promise<Board> => boardsRepo.createBoard(dto);

const remove = (id: string): Promise<'DELETED'> => boardsRepo.deleteBoard(id);

export { getAll, getById, create, update, remove };
