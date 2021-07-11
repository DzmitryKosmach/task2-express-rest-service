import { Inject, Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { UsersStore } from './interfaces/user-storage.interface';
//import { InMemoryUsersStorage } from './store/in-memory.users.storage';

@Injectable()
export class UsersService {
  constructor(@Inject('UsersStore') private storage: UsersStore) {
    this.createUserAdmin();
  }

  create(createUserDto: UserDTO) {
    return this.storage.create(createUserDto);
  }

  findAll() {
    return this.storage.getAll();
  }

  findOne(id: string) {
    return this.storage.getById(id);
  }

  update(id: string, updateUserDto: UserDTO) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }

  createUserAdmin() {
    this.storage.createUserAdmin();
  }
}
