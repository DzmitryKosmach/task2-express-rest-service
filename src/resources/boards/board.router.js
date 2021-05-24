const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(
  asyncHandler(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.getById(id);
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
    board.id = id;
    res.status(200).json(await boardsService.update(board));
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(204);
  })
);

module.exports = router;
