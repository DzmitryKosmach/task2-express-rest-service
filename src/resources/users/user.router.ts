import {Request, Response, Router}  from 'express';
import asyncHandler from 'express-async-handler';

import User from '../../entities/user';
import * as usersService from './user.service';
import {convertToString} from '../../common/utils'
import { UserDTO } from '../../common/types';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await usersService.getById(convertToString(id));
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const user = await usersService.create(req.body);    
    res.status(201).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    let { id } = req.params;
    const userDTO: UserDTO = req.body;
    id = convertToString(id);
    res.status(200).json(User.toResponse(await usersService.update(id, userDTO)));
  })
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await usersService.remove(convertToString(id));
    res.sendStatus(200);
  })
);

export default router;
