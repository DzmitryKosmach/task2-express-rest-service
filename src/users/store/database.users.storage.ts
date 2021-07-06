import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getHashPassword } from 'src/common/helpers';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersStore } from '../interfaces/user-storage.interface';

@Injectable()
export class DatabaseUsersStorage implements UsersStore {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  getAll = async (): Promise<UserEntity[]> => {
    return this.repo.find({ where: {} });
  };

  getById = async (id: string): Promise<UserEntity | undefined> => {
    return this.repo.findOne(id);
  };

  update = async (
    id: string,
    dto: UserDTO,
  ): Promise<UserEntity | undefined> => {
    const user = await this.repo.findOne(id);
    if (!user) return undefined;
    await this.repo.update(id, dto);
    return await this.repo.findOne(id);
  };

  create = async (dto: UserDTO): Promise<UserEntity> => {
    const { password } = dto;
    const hashedPasword = await getHashPassword(password);
    const preCreateDto = dto;
    preCreateDto.password = hashedPasword;
    //const userRepository = getRepository(User);
    const newUser = this.repo.create(preCreateDto);
    const savedUser = this.repo.save(newUser);
    return savedUser;
  };

  remove = async (id: string): Promise<'DELETED'> => {
    const deletionRes = await this.repo.delete(id);
    if (deletionRes.affected) return 'DELETED';
  };

  private getUserByProps = async (
    props: Partial<UserEntity>,
  ): Promise<UserEntity | undefined> => {
    return this.repo.findOne(props);
  };

  createUserAdmin = async (): Promise<void> => {
    const userDto = { login: 'admin', password: 'admin' } as UserDTO;
    const propLogin = { login: 'admin' };

    const user = await this.getUserByProps(propLogin);
    if (!user) this.create(userDto);
  };
}
