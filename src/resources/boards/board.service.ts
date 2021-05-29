import * as boardsRepo from'./board.memory.repository';
import Board from './board.model';

const getAll = (): Promise<Array<Board>> => boardsRepo.getAll();

const getById = (id: string): Promise<Board> => boardsRepo.getBoard(id);

const update = (board: Board): Promise<Board> => boardsRepo.updateBoard(board);

const save = (board: Board): Promise<Board> => boardsRepo.saveBoard(board);

const remove = (id: string): Promise<void> => boardsRepo.removeBoard(id);

export { getAll, getById, save, update, remove };
