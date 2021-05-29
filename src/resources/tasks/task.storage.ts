import usersStorage from '../users/user.storage';
import boardsStorage from '../boards/board.storage';
import Task from './task.model';

const {users} = usersStorage;
const {boards} = boardsStorage;

const tasksStorage = {tasks: [
  new Task({
    title: 'Title Task',
    order: 0,
    description: 'Description Task',
    userId: users[0]!.id,
    boardId: boards[0]!.id,
    columnId: boards[0]!.columns[0]!.id,
  }),
  new Task({
    title: 'Title Task',
    order: 0,
    description: 'Description Task',
    userId: users[1]!.id,
    boardId: boards[1]!.id,
    columnId: boards[1]!.columns[0]!.id,
  }),
]};

export default tasksStorage;
