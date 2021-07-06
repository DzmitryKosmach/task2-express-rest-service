import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksStore } from './interfaces/task-storage.interface';

@Injectable()
export class TasksService {
  constructor(@Inject('TasksStore') private storage: TasksStore) {}

  create(boardId: string, createTaskDto: CreateTaskDto) {
    return this.storage.create(boardId, createTaskDto);
  }

  findAll(boardId: string) {
    return this.storage.getAll(boardId);
  }

  findOne(boardId: string, id: string) {
    return this.storage.getById(boardId, id);
  }

  update(boardId: string, id: string, updateTaskDto: UpdateTaskDto) {
    return this.storage.update(boardId, id, updateTaskDto);
  }

  remove(boardId: string, id: string) {
    return this.storage.remove(boardId, id);
  }

  removeTasksByBoard(id: string) {
    this.storage.removeTasksByBoard(id);
  }
}
