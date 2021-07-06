import { Injectable } from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersStore } from '../interfaces/user-storage.interface';

@Injectable()
export class InMemoryUsersStorage implements UsersStore {
  private users: UserEntity[] = [];

  getAll = async (): Promise<UserEntity[]> => {
    return this.users;
  };

  getById = async (id: string): Promise<UserEntity> => {
    const user = this.users[id];
    return user;
  };

  update: (id: string, dto: UserDTO) => Promise<UserEntity>;

  create = async (dto: UserDTO): Promise<UserEntity> => {
    const newUser = { ...dto };
    this.users.push(newUser);
    return newUser;
  };

  remove: (id: string) => Promise<'DELETED'>;

  createUserAdmin: () => Promise<void>;
}
