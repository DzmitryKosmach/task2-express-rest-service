import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'

import ColumnBoard from './column_board';

@Entity({name: 'board'})
class Board {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {length: 60})
  title = 'Title';
  
  @OneToMany(() => ColumnBoard, (columnBoard) => columnBoard.board, { cascade: true, onDelete: 'CASCADE'  })
  columns: ColumnBoard[];    
}

export default Board;
