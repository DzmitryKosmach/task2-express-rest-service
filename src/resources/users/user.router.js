const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(
  asyncHandler(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getById(id);
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/').post(
  asyncHandler(async (req, res) => {
    const user = await usersService.save(new User(req.body));
    res.status(201).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = new User(req.body);
    user.id = id;
    res.status(200).json(User.toResponse(await usersService.update(user)));
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(200);
  })
);

module.exports = router;
