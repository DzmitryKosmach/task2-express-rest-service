import {Request, Response, Router}  from 'express';
import asyncHandler from 'express-async-handler';

import Board from './board.model';
import * as boardsService from './board.service';
import {convertToString} from '../../common/utils'

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
    const board = await boardsService.save(new Board(req.body));
    res.status(201).json(board);
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res) => {
    const board = new Board(req.body);
    const { id } = req.params;
    board.id = convertToString(id);
    res.status(200).json(await boardsService.update(board));
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
