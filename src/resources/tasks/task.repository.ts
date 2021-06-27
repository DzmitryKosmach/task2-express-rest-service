import { getRepository } from 'typeorm';
import createError from 'http-errors';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import Task from '../../entities/task';

import { TaskDTO } from '../../common/types';
// import Board from '../../entities/board';

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
  // console.log("\n\n\n Before:  ",  JSON.stringify(await getTask(boardId, id)));
  const deletionRes = await taskRepository.delete(id);
  // console.log("\n\n\n After:  ", JSON.stringify(deletionRes.affected));
  if(!deletionRes.affected) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  
  return 'DELETED';
}

const removeTasksByBoard = async (id: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  await taskRepository.delete({boardId: id})
  // tasks = tasks.filter((t) => t.boardId !== id);
};

/** 
const removeUserFromTasks = async (id: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({userId: id});
  await tasks.forEach(async (task) => {
    const taskNullUser = task;
    taskNullUser.userId = null;
    const taskNullUserDTO = taskNullUser as TaskDTO;
    await taskRepository.update(taskNullUser.id, taskNullUserDTO);
    const taskNullUserUpdated = await taskRepository.findOne({id: taskNullUser.id});
    console.log("\nTaskNulUser - ", JSON.stringify(taskNullUserUpdated));
  });
*/


  /**
  tasks.forEach((task) => {
    const currentTask = task;
    if (task.userId === id) currentTask.userId = null;
  });
   */
// };

export {
  getAll,
  getTask,
  createTask,
  updateTask,  
  deleteTask,
  removeTasksByBoard,  
};
