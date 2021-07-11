// import { User } from '../entities/user.entity';

import { CreateUserDto } from './create-user.dto';

// export type UserDTO = Omit<User, 'id'>;

export class UserDTO extends CreateUserDto {}
