import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'user_game'})
class User {

  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {length: 30})
  name  = 'USER';

  @Column('varchar', {length: 30})  
  login = 'user';

  @Column('varchar', {length: 30})
  password = 'P@55w0rd';
 
  static toResponse(user: User): {id: string, name: string, login: string} {
    const { id, name, login } = user;
    return { id, name, login };
  }
  
}

export default User;
