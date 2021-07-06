import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
//import { UserDTO } from '../dto/user.dto';

export interface UsersStore {
  getAll: () => Promise<UserEntity[]>;

  getById: (id: string) => Promise<UserEntity>;

  update: (id: string, dto: UpdateUserDto) => Promise<UserEntity>;

  create: (dto: CreateUserDto) => Promise<UserEntity>;

  remove: (id: string) => Promise<'DELETED'>;

  createUserAdmin: () => Promise<void>;
}
