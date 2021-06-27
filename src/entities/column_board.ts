import {Entity, Column, ManyToOne, PrimaryColumn} from 'typeorm'
import { v4 as uuid } from 'uuid'

import Board from './board';

@Entity({name: 'column_board'})
class ColunmBoard {

  @PrimaryColumn()
  id: string = uuid();

  @Column('varchar', {length: 60})
  title = 'Title';

  @Column('integer')
  order = 0;
    
  @ManyToOne(() => Board, (board) => board.columns)  
  board: Board;
   
}

export default ColunmBoard;
