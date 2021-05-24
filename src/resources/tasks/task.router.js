const router = require('express').Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');
const createError = require('http-errors');
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(
  asyncHandler(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);
    res.status(200).json(tasks);
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId, id);
    res.status(200).json(task);
  })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
    const { boardId } = req.params;
    const newTask = new Task(req.body);
    const task = await tasksService.save(boardId, newTask);
    res.status(201).json(task);
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res) => {
    const newTask = new Task(req.body);
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId, id);
    if (!task || newTask.boardId !== boardId) createError(401);
    newTask.id = id;
    res.status(200).json(tasksService.update(newTask));
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
    await tasksService.remove(req.params.id);
    res.sendStatus(200);
  })
);

module.exports = router;
