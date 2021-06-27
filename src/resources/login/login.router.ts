import {Request, Response, Router}  from 'express';
import createError from 'http-errors';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import * as loginService from './login.service';

const router = Router();

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const token = await loginService.signToken(login, password);    
    if(!token) throw createError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN);
    const tokenJson  = {token};
    res.status(StatusCodes.OK).json(tokenJson);
  })
);


export default router;
