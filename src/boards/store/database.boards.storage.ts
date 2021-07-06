import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardDTO } from '../dto/board.dto';
import { BoardEntity } from '../entities/board.entity';
import { ColunmBoardEntity } from '../entities/column_board.entity';
import { BoardsStore } from '../interfaces/board-storage.interface';

@Injectable()
export class DatabaseBoardsStorage implements BoardsStore {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly repo: Repository<BoardEntity>,
  ) {}

  getAll = async (): Promise<BoardEntity[]> => {
    return this.repo.find({ relations: ['columns'] });
  };

  getById = async (id: string): Promise<BoardEntity | undefined> => {
    return await this.repo.findOne(id, { relations: ['columns'] });
  };

  update = async (
    id: string,
    dto: BoardDTO,
  ): Promise<BoardEntity | undefined> => {
    const board = await this.getById(id);
    if (!board) return undefined;
    const preUpdateBoard = this.repo.create(dto);
    preUpdateBoard.id = id;
    const updatedBoard = await this.repo.save(preUpdateBoard);
    return updatedBoard;
  };

  create = async (dto: BoardDTO): Promise<BoardEntity> => {
    const newBoard = this.repo.create(dto);
    const savedBoard = this.repo.save(newBoard);
    return savedBoard;
  };

  remove = async (id: string): Promise<'DELETED' | undefined> => {
    await this.repo
      .createQueryBuilder()
      .delete()
      .from(ColunmBoardEntity)
      .where('boardId = :id', { id })
      .execute();

    //const deletionRes = await this.repo.delete(id);
    const deletionRes = await this.repo
      .createQueryBuilder()
      .delete()
      .from(BoardEntity)
      .where({ id })
      .execute();
    if (deletionRes.affected !== 0) return 'DELETED';
    return undefined;
    //if (deletionRes.affected) return 'DELETED';
  };
}
