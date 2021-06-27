import  Jwt  from 'jsonwebtoken';
import createError from 'http-errors';
import {NextFunction, Request, Response}  from 'express';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';

import { convertToString } from '../utils';
import { JWT_SECRET_KEY, JWT_BEARER } from '../config'

export const authMiddleware = (req: Request, res: Response, next: NextFunction): NextFunction | void => {
    const authHeader = req.header('Authorization');

    if(authHeader !== undefined){
        const tokenString = req.header('Authorization');
        const [type, token] = convertToString(tokenString).split(' ');

        try {
            if(type !== JWT_BEARER){                
                res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
            } else {                
                Jwt.verify(convertToString(token), convertToString(JWT_SECRET_KEY));
                return next();
            }
        } catch (error) {
            throw createError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }
        
    }
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return next();
}
