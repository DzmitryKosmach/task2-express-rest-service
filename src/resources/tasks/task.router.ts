import {Request, Response, Router}  from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import {StatusCodes} from 'http-status-codes';
import Task from'./task.model';
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
    const newTask = new Task(req.body);
    const task = await tasksService.save(convertToString(boardId), newTask);
    res.status(StatusCodes.CREATED).json(task);
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const newTask = new Task(req.body);
    const { boardId, id } = req.params;
    const idString = convertToString(id);
    const task = await tasksService.getById(convertToString(boardId), idString);
    if (!task || newTask.boardId !== boardId) createError(StatusCodes.UNAUTHORIZED);
    newTask.id = idString;
    res.status(StatusCodes.OK).json(tasksService.update(newTask));
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
