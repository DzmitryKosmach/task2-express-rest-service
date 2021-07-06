import  Jwt  from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '../../common/config';
import * as usersRepo from '../users/user.repository';
import { convertToString } from '../../common/utils';
import {checkHashPassword} from '../../common/helpers/hashHelper';

const signToken = async (login: string, passwordUser: string): Promise<string | null> => {
    const user = await usersRepo.getUserByProps({login});    
    if(!user) return null;
    const { password:hashPassword } = user;       
    const comparisonRes = await checkHashPassword(passwordUser, hashPassword);    
    if(comparisonRes){
        const { id, login:loginUser } = user;
        const token = Jwt.sign({id, login: loginUser}, convertToString(JWT_SECRET_KEY), {expiresIn: '10m'});
        return token;
    }
    return null;
}

export { signToken }