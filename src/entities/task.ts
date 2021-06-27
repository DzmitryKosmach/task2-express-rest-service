import {Entity, Column, PrimaryColumn, ManyToOne} from 'typeorm'
import { v4 as uuid } from 'uuid'
import User from './user';

@Entity({name: 'task'})
class Task {

  @PrimaryColumn()
  id: string = uuid();

  @Column('varchar', {length: 60})
  title = 'Title';

  @Column('integer')
  order = 0;

  @Column('varchar', {length: 30})
  description: string;

  // @Column('varchar', {nullable: true})
  // userId: string | null;
  @ManyToOne(() => User, (user: User) => user.id, { onDelete: 'SET NULL', nullable: true, eager: true })
  userId?: string

  @Column('varchar', {nullable: true})
  boardId: string;

  @Column('varchar',{nullable: true})
  columnId: string;
  
}

export default Task;
