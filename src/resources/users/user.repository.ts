import { getRepository } from 'typeorm';
import createError from 'http-errors';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import User from '../../entities/user';
import { getHashPassword } from '../../common/helpers/hashHelper';

// import { removeUserFromTasks } from '../tasks/task.memory.repository';
import { UserDTO } from '../../common/types';
// import { removeUserFromTasks } from '../tasks/task.repository';

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
  // return updatedUserRaw.raw;
  return getUserById(id); 
};

const deleteUser = async (id: string): Promise<'DELETED'> => {
  const userRepository = getRepository(User);
  const deletionRes = await userRepository.delete(id);
  if(!deletionRes.affected) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  // removeUserFromTasks(id);
  return 'DELETED';
}

const getUserByLoginPassword = async (login: string, password: string): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({login, password});

  if (!user) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  return user;
};

const getUserByLogin = async (login: string): Promise<User> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({login});

  if (!user) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  return user;
};

const createUserAdmin = async():Promise<void> => {
  const userDto = {login: "admin", password: "admin"};
  createUser(userDto as UserDTO);
}

/**
 * {login: '12345', password: '12222'}
const getUserByProps = (props) => mockUser.find(user => {
    const matchers = Object.entries(props).map(item => {
        const [prop, value] = item;
        return user[prop] === value;
    });
    return matches.every(item => item === true);
});
*/

export { getAll, getUserById, createUser, updateUser, deleteUser, getUserByLoginPassword, getUserByLogin, createUserAdmin };
