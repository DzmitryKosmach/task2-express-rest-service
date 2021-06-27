import Board from "../entities/board";
import Colunm from "../entities/column_board";
import Task from "../entities/task";
import User from "../entities/user";

export type UserDTO = Omit<User, 'id'>;
export type BoardDTO = Omit<Board, 'id'>;
export type ColumnDTO = Omit<Colunm, 'id'>;
export type TaskDTO = Omit<Task, 'id'>;
