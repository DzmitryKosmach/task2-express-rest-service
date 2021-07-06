import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

export interface TasksStore {
  getAll: (boardId: string) => Promise<TaskEntity[]>;
  getById: (boardId: string, id: string) => Promise<TaskEntity>;
  update: (
    boardId: string,
    id: string,
    dto: UpdateTaskDto,
  ) => Promise<TaskEntity>;
  create: (boardId: string, dto: CreateTaskDto) => Promise<TaskEntity>;
  remove: (boardId: string, id: string) => Promise<'DELETED' | undefined>;
  removeTasksByBoard: (id: string) => Promise<void>;
}
