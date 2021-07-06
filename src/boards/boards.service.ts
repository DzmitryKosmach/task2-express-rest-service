import { Inject, Injectable } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { DatabaseBoardsStorage } from './store/database.boards.storage';

@Injectable()
export class BoardsService {
  constructor(
    @Inject('BoardsStore') private storage: DatabaseBoardsStorage,
    private readonly tasksService: TasksService,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.storage.create(createBoardDto);
  }

  findAll() {
    return this.storage.getAll();
  }

  findOne(id: string) {
    return this.storage.getById(id);
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return this.storage.update(id, updateBoardDto);
  }

  async remove(id: string) {
    const affected = await this.storage.remove(id);
    if (affected) {
      this.tasksService.removeTasksByBoard(id);
      return affected;
    }
    return affected;
  }
}
