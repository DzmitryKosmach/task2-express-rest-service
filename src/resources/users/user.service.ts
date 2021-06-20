import * as usersRepo from './user.repository';
import User from '../../entities/user';
import { UserDTO } from '../../common/types';

const getAll = (): Promise<Array<User>> => usersRepo.getAll();

const getById = (id: string): Promise<User> => usersRepo.getUserById(id);

const update = (id: string, dto: UserDTO): Promise<User> => usersRepo.updateUser(id, dto);

const create = (dto: UserDTO): Promise<User> => usersRepo.createUser(dto);

const remove = (id: string): Promise<'DELETED'> => usersRepo.deleteUser(id);

export { getAll, getById, create, update, remove };
