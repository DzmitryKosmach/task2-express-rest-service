import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { BoardEntity } from './board.entity';

@Entity({ name: 'column_board' })
export class ColunmBoardEntity {
  @PrimaryColumn()
  id: string = uuid();

  @Column('varchar', { length: 60 })
  title = 'Title';

  @Column('integer')
  order = 0;

  @ManyToOne(() => BoardEntity, (board) => board.columns)
  board: BoardEntity;
}
