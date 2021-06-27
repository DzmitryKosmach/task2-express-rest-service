import {Entity, Column, OneToMany, PrimaryColumn} from 'typeorm'
import { v4 as uuid } from 'uuid'

import ColumnBoard from './column_board';

@Entity({name: 'board'})
class Board {

  @PrimaryColumn()
  id: string = uuid();

  @Column('varchar', {length: 60})
  title = 'Title';
  
  @OneToMany(() => ColumnBoard, (columnBoard) => columnBoard.board, { cascade: true, onDelete: 'CASCADE'  })
  columns: ColumnBoard[];    
}

export default Board;
