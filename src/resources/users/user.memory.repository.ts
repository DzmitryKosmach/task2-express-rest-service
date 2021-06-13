import createError from 'http-errors';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import usersStorage from './user.storage';
import User from './user.model';

import { removeUserFromTasks } from '../tasks/task.memory.repository';

let {users} = usersStorage;

const getAll = async (): Promise<Array<User>> => users;

const getUser = async (id: string): Promise<User> => {
  const user = users.find((u) => u.id === id);

  if (!user) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

  return user;
};

const saveUser = async (user: User):Promise<User> => {
  users.push(user);
  return user;
};

const updateUser = async (user: User):Promise<User> => {
  const userIndex = users.findIndex((u) => u.id === user.id);
  if (userIndex < 0) {
    throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  }
  users[userIndex] = user;
  return user;
};

const removeUser = async (id: string): Promise<void> => {
  users = users.filter((u) => u.id !== id);
  removeUserFromTasks(id);
};

export { getAll, getUser, updateUser, saveUser, removeUser };
