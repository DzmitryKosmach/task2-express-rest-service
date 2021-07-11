import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ColunmBoardEntity } from './column_board.entity';

@Entity({ name: 'board' })
export class BoardEntity {
  @PrimaryColumn()
  id: string = uuid();

  @Column('varchar', { length: 60 })
  title = 'Title';

  @OneToMany(() => ColunmBoardEntity, (columnBoard) => columnBoard.board, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  columns: ColunmBoardEntity[];
}
