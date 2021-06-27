import { getRepository } from 'typeorm';
import createError from 'http-errors';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import User from '../../entities/user';

import { UserDTO } from '../../common/types';
import { removeUserFromTasks } from '../tasks/task.repository';

const getAll = async (): Promise<User[]> => {
  const userRepository = getRepository(User);
  return userRepository.find({where: {}});
};

const getUserById = async (id: string): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  if (!user) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  return user;
};

const createUser = async (dto: UserDTO):Promise<User> => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create(dto);
  const savedUser = userRepository.save(newUser);
  return savedUser;  
};

const updateUser = async (id: string, dto: UserDTO):Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  if(!user) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  await userRepository.update(id, dto);
  return getUserById(id); 
};

const deleteUser = async (id: string): Promise<'DELETED'> => {
  const userRepository = getRepository(User);
  const deletionRes = await userRepository.delete(id);
  if(!deletionRes.affected) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  removeUserFromTasks(id);
  return 'DELETED';
}

export { getAll, getUserById, createUser, updateUser, deleteUser };
