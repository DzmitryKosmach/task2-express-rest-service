import { v4 as uuid } from 'uuid';

class Colunm {
  id: string = uuid();

  title = 'Title';

  order = 0;

  constructor({ id = uuid(), title = 'Title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Colunm;
