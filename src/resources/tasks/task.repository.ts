import { getRepository } from 'typeorm';
import createError from 'http-errors';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import Task from '../../entities/task';

import { TaskDTO } from '../../common/types';
import Board from '../../entities/board';

const getAll = async (boardID: string): Promise<Task[]> => {  
  const taskRepository = getRepository(Task);
  return taskRepository.find({where: {boardId: boardID}});  
}

const getTask = async (boardID: string, id: string): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({where: [{boardId: boardID}, {id: `${id}`}]});
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
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(boardId);  
  if(!board) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(id);
  if(!task) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  const preUpdateDTO = dto;
  // preUpdateDTO.boardId = boardId;
  const preUpdateTask = taskRepository.create(preUpdateDTO);
  // preUpdateTask.id = id;  
  
  
  const updatedTask = await taskRepository.save(preUpdateTask);   
  return updatedTask;
};

const deleteTask = async (boardId: string, id: string): Promise<'DELETED'> => {
  const taskRepository = getRepository(Task);
  getTask(boardId, id);
  const deletionRes = await taskRepository.delete(id);
  if(!deletionRes.affected) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  return 'DELETED';
}

const removeTasksByBoard = async (id: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  await taskRepository.delete({boardId: id})
};

const removeUserFromTasks = async (id: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({userId: id});
  tasks.forEach((task) => {
    const taskNullUser = task;
    taskNullUser.userId = null;
    const taskNullUserDTO = taskNullUser as TaskDTO
    taskRepository.update(taskNullUser.id, taskNullUserDTO);
  });    
};

export {
  getAll,
  getTask,
  createTask,
  updateTask,  
  deleteTask,
  removeTasksByBoard,
  removeUserFromTasks,
};
