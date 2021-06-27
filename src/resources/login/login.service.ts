import  Jwt  from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../common/config';
import * as usersRepo from '../users/user.repository';
import { convertToString } from '../../common/utils';
import {checkHashPassword} from '../../common/helpers/hashHelper';


/**
const create = (dto: UserDTO): Promise<User> => usersRepo.createUser(dto);
const getUserById = async (id: string): Promise<User> => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);
    if (!user) throw createError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
    return user;
  };
 */

const signToken = async (loginUser: string, passwordUser: string): Promise<string | null> => {
    const user = await usersRepo.getUserByLogin(loginUser);    
    if(!user) return null;
    const { password:hashPassword } = user;       
    const comparisonRes = await checkHashPassword(passwordUser, hashPassword);    
    if(comparisonRes){
        const { id, login } = user;
        const token = Jwt.sign({id, login}, convertToString(JWT_SECRET_KEY), {expiresIn: '10m'});
        return token;
    }
    return null;
}

export { signToken }