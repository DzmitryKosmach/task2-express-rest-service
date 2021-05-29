import Board from './board.model';
import Colunm from './column.model';

const boardsStorage = {boards: [
  new Board({
    title: 'Board Title',
    columns: [
      new Colunm({ title: 'Column Title', order: 0 }),
      new Colunm({ title: 'Column Title2', order: 1 }),
    ],
  }),
  new Board({
    title: 'Board Title2',
    columns: [
      new Colunm({ title: 'Column Title4', order: 0 }),
      new Colunm({ title: 'Column Title4', order: 1 }),
    ],
  }),
]};

export default boardsStorage;
