import createError from 'http-errors';
import Task from './task.model';

import tasksStorage from './task.storage';

let {tasks} = tasksStorage;

const getAll = async (boardId: string): Promise<Array<Task>> =>   
  tasks.filter((task) => task.boardId === boardId);

const getTask = async (boardId: string, id: string): Promise<Task> => {
  const task = tasks.filter((t) => t.boardId === boardId).find(
    (t) => t.id === id
  );

  if (!task) throw createError(404);

  return task;
};

const saveTask = async (boardId: string, task: Task): Promise<Task> => {
  const newTask = task;
  newTask.boardId = boardId;
  tasks.push(newTask);
  return task;
};

const updateTask = async (task: Task): Promise<Task> => {
  const taskIndex = tasks.findIndex((t) => t.id === task.id);
  if (taskIndex < 0) {
    throw createError(400);
  }
  tasks[taskIndex] = task;
  return task;
};

const removeTask = async (boardId: string, id: string): Promise<void> => {
  if (!getTask(boardId, id)) throw createError(404);
  tasks = tasks.filter((t) => t.id !== id);
};

const removeTasksByBoard = async (id: string): Promise<void> => {
  tasks = tasks.filter((t) => t.boardId !== id);
};

const removeUserFromTasks = async (id: string): Promise<void> => {
  tasks.forEach((task) => {
    const currentTask = task;
    if (task.userId === id) currentTask.userId = null;
  });
};

export {
  getAll,
  getTask,
  updateTask,
  saveTask,
  removeTask,
  removeTasksByBoard,
  removeUserFromTasks,
};
