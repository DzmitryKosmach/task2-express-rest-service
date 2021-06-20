import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import Board from './board';

@Entity({name: 'column_board'})
class ColunmBoard {

  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {length: 60})
  title = 'Title';

  @Column('integer')
  order = 0;
    
  @ManyToOne(() => Board, (board) => board.columns)  
  board: Board;
   
}

export default ColunmBoard;
