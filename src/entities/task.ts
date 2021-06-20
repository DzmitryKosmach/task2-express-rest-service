import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'task'})
class Task {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {length: 60})
  title = 'Title';

  @Column('integer')
  order = 0;

  @Column('varchar', {length: 30})
  description: string;

  @Column('uuid', {nullable: true})
  userId: string | null;

  @Column('uuid', {nullable: true})
  boardId: string;

  @Column('uuid', {nullable: true})
  columnId: string;
}

export default Task;
