import { ColunmBoardEntity } from '../entities/column_board.entity';

export class CreateBoardDto {
  id: string;
  title: string;
  columns: ColunmBoardEntity[];
}
