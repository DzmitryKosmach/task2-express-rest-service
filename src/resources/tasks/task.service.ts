import * as taskRepo from './task.memory.repository';
import Task from './task.model';

const getAll = (boardId: string): Promise<Array<Task>> => taskRepo.getAll(boardId);

const getById = (boardId: string, id: string): Promise<Task> => taskRepo.getTask(boardId, id);

const update = (task: Task): Promise<Task> => taskRepo.updateTask(task);

const save = (boardId: string, task: Task): Promise<Task> => taskRepo.saveTask(boardId, task);

const remove = (boardId: string, id: string): Promise<void> => taskRepo.removeTask(boardId, id);

export { getAll, getById, save, update, remove };
