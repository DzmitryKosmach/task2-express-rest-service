import {Request, Response, Router}  from 'express';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import * as tasksService from './task.service';
import {convertToString} from '../../common/utils'

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(convertToString(boardId));
    res.status(StatusCodes.OK).json(tasks);
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(convertToString(boardId), convertToString(id));
    res.status(StatusCodes.OK).json(task);
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    // const newTask = new Task(req.body);
    const task = await tasksService.create(convertToString(boardId), req.body);
    res.status(StatusCodes.CREATED).json(task);
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { boardId, id } = req.params;
    const boardIdString = convertToString(boardId);
    const idString = convertToString(id);

    const updatedTask = await tasksService.update(boardIdString, idString, req.body)

    console.log('-----------------------');
    console.log(`task = ${JSON.stringify(updatedTask)}`);
    console.log('-----------------------');
    res.status(StatusCodes.OK).json(updatedTask);
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
    const { boardId, id } = req.params;
    await tasksService.remove(convertToString(boardId), convertToString(id));
    res.sendStatus(StatusCodes.OK);
  })
);

export default router;
