import {Request, Response, Router}  from 'express';
import asyncHandler from 'express-async-handler';

import * as boardsService from './board.service';
import {convertToString} from '../../common/utils'
import { BoardDTO } from '../../common/types';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req:Request, res: Response) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const board = await boardsService.getById(convertToString(id));
    res.status(200).json(board);
  })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
    const board = await boardsService.create(req.body);
    res.status(201).json(board);
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res) => {    
    let { id } = req.params;
    const boardDTO: BoardDTO = req.body;
    id = convertToString(id);
    res.status(200).json(await boardsService.update(id, boardDTO));
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await boardsService.remove(convertToString(id));
    res.sendStatus(204);
  })
);

export default router;
