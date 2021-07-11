import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardEntity } from '../entities/board.entity';
import { BoardsStore } from '../interfaces/board-storage.interface';

@Injectable()
export class InMemoryBoardsStorage implements BoardsStore {
  private boards: BoardEntity[] = [];

  getAll = async (): Promise<BoardEntity[]> => {
    return this.boards;
  };
  getById: (id: string) => Promise<BoardEntity>;
  update: (id: string, dto: UpdateBoardDto) => Promise<BoardEntity>;
  create: (dto: CreateBoardDto) => Promise<BoardEntity>;
  remove: (id: string) => Promise<'DELETED'>;
}
