import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryColumn()
  id: string = uuid();

  @Column('varchar', { length: 60 })
  title = 'Title';

  @Column('integer')
  order = 0;

  @Column('varchar', { length: 30 })
  description: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  userId?: string;

  @Column('varchar', { nullable: true })
  boardId: string;

  @Column('varchar', { nullable: true })
  columnId: string;
}
