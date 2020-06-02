const router = require('express').Router();
const userRouter = require('./user-router');
const componentRouter = require('./component-router');

router.use('/user', userRouter);
router.use('/component', componentRouter);

module.exports = router;
