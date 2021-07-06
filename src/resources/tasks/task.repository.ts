import { getRepository } from 'typeorm';
import createError from 'http-errors';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';

import Task from '../../entities/task';
import { TaskDTO } from '../../common/types';

const getAll = async (boardID: string): Promise<Task[]> => {  
  const taskRepository = getRepository(Task);
  return taskRepository.find({where: {boardId: boardID}});  
}

const getTask = async (boardId: string, id: string): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({boardId, id});
  if (!task) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  return task;
};

const createTask = async(boardId: string, dto: TaskDTO): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const newTaskDTO = dto;
  newTaskDTO.boardId = boardId;  
  const newTask = taskRepository.create(newTaskDTO);  
  const savedTask = await taskRepository.save(newTask);  
  return savedTask;  
};

const updateTask = async (boardId: string, id: string, dto: TaskDTO):Promise<Task> => {
  await getTask(boardId, id);  
  const taskRepository = getRepository(Task); 
  await taskRepository.update(id, dto);  
  const updatedTask = await getTask(boardId, id);  
  return updatedTask; 
};

const deleteTask = async (boardId: string, id: string): Promise<'DELETED'> => {
  const taskRepository = getRepository(Task);
  await getTask(boardId, id)
  const deletionRes = await taskRepository.delete(id);
  if(!deletionRes.affected) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  
  return 'DELETED';
}

const removeTasksByBoard = async (id: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  await taskRepository.delete({boardId: id})
};

export {
  getAll,
  getTask,
  createTask,
  updateTask,  
  deleteTask,
  removeTasksByBoard,  
};
