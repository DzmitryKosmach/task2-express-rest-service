import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
// import { TaskDTO } from '../dto/task.dto.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { TasksStore } from '../interfaces/task-storage.interface';

@Injectable()
export class InMemoryTasksStorage implements TasksStore {
  private tasks: TaskEntity[] = [];
  getAll: (boardId: string) => Promise<TaskEntity[]>;
  getById: (boardId: string, id: string) => Promise<TaskEntity>;
  update: (
    boardId: string,
    id: string,
    dto: UpdateTaskDto,
  ) => Promise<TaskEntity>;
  create: (boardId: string, dto: CreateTaskDto) => Promise<TaskEntity>;
  remove: (boardId: string, id: string) => Promise<'DELETED'>;
  removeTasksByBoard: (id: string) => Promise<void>;
}
