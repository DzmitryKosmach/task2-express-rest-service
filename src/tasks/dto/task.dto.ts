// import { User } from '../entities/user.entity';

import { CreateTaskDto } from './create-task.dto';

// export type TaskDTO = Omit<User, 'id'>;

export class TaskDTO extends CreateTaskDto {}
