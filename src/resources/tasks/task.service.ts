import * as taskRepo from './task.repository';
import Task from '../../entities/task';
import { TaskDTO } from '../../common/types';

const getAll = (boardId: string): Promise<Task[]> => taskRepo.getAll(boardId);

const getById = (boardId: string, ID: string): Promise<Task> => taskRepo.getTask(boardId, ID);

const update = (boardId: string, id: string, dto: TaskDTO): Promise<Task> => taskRepo.updateTask(boardId, id, dto);

const create = (boardId: string, dto: TaskDTO): Promise<Task> => taskRepo.createTask(boardId, dto);

const remove = (boardId: string, id: string): Promise<'DELETED'> => taskRepo.deleteTask(boardId, id);

export { getAll, getById, create, update, remove };
