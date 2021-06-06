import { v4 as uuid } from 'uuid';

import Column from './column.model';

class Board {
  id:string;

  title: string;

  columns: Array<Column>;
  
  constructor({ id = uuid(), title = 'Title', columns = [{}] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => new Column(column));
  }
}

export default Board;
