import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'user_game' })
export class UserEntity {
  @PrimaryColumn()
  id: string = uuid();

  @Column('varchar', { length: 30 })
  name = 'USER';

  @Column('varchar', { length: 30 })
  login = 'user';

  @Column('varchar')
  password = 'P@55w0rd';

  static toResponse(user: UserEntity): {
    id: string;
    name: string;
    login: string;
  } {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
