import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskDTO } from '../dto/task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { TasksStore } from '../interfaces/task-storage.interface';

@Injectable()
export class DatabaseTasksStorage implements TasksStore {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repo: Repository<TaskEntity>,
  ) {}

  getAll = async (boardId: string): Promise<TaskEntity[]> => {
    return this.repo.find({ where: { boardId } });
  };

  getById = async (
    boardId: string,
    id: string,
  ): Promise<TaskEntity | undefined> => {
    return await this.repo.findOne({ boardId, id });
  };

  update = async (
    boardId: string,
    id: string,
    dto: UpdateTaskDto,
  ): Promise<TaskEntity | undefined> => {
    const task = await this.getById(boardId, id);
    if (!task) return undefined;
    await this.repo.update(id, dto);
    const updatedTask = await this.getById(boardId, id);
    return updatedTask;
  };

  create = async (boardId: string, dto: TaskDTO): Promise<TaskEntity> => {
    const newTaskDTO = dto;
    newTaskDTO.boardId = boardId;
    const newTask = this.repo.create(newTaskDTO);
    const savedTask = await this.repo.save(newTask);
    return savedTask;
  };

  remove = async (
    boardId: string,
    id: string,
  ): Promise<'DELETED' | undefined> => {
    const task = await this.getById(boardId, id);
    if (!task) return undefined;
    const deletionRes = await this.repo
      .createQueryBuilder()
      .delete()
      .from(TaskEntity)
      .where({ boardId, id })
      .execute();
    if (deletionRes.affected) return 'DELETED';
    return undefined;
  };

  removeTasksByBoard = async (id: string): Promise<void> => {
    await this.repo.delete({ boardId: id });
  };
}
