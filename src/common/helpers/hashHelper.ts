import  * as bcrypt  from 'bcrypt';
import { DEFAULT_SALT_ROUNDS } from "../config";
import { convertToString } from '../utils';

const getHashPassword =  async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(Number(convertToString(DEFAULT_SALT_ROUNDS)));
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const checkHashPassword =  async (password: string, hash: string): Promise<boolean> => {
    const isEqual = await bcrypt.compare(password, hash);    
    return isEqual;    
}

export { getHashPassword, checkHashPassword}