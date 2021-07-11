import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardEntity } from '../entities/board.entity';

export interface BoardsStore {
  getAll: () => Promise<BoardEntity[]>;

  getById: (id: string) => Promise<BoardEntity>;

  update: (id: string, dto: UpdateBoardDto) => Promise<BoardEntity>;

  create: (dto: CreateBoardDto) => Promise<BoardEntity>;

  remove: (id: string) => Promise<'DELETED' | undefined>;
}
