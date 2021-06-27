import { getRepository } from 'typeorm';
import createError from 'http-errors';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';

import User from '../../entities/user';
import { getHashPassword } from '../../common/helpers/hashHelper';
import { UserDTO } from '../../common/types';

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
  const { password } = dto;
  const hashedPasword = await getHashPassword(password);
  const preCreateDto = dto;
  preCreateDto.password = hashedPasword;
  const userRepository = getRepository(User);
  const newUser = userRepository.create(preCreateDto);
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
  return 'DELETED';
}

const getUserByProps = async(props: Partial<User>):Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(props);
  if (!user) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  return user;
}

const createUserAdmin = async ():Promise<void> => {
  const userDto = {login: "admin", password: "admin"} as UserDTO;
  const propLogin = {login: "admin"};  
  try {
    await getUserByProps(propLogin);
  } catch (error) {
    createUser(userDto);
  }  
}

export { getAll, getUserById, createUser, updateUser, deleteUser, createUserAdmin, getUserByProps };
