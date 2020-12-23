const router = require('express').Router();

const userRouter = require('./users');
const applianceRouter = require('./appliances');
const authRouter = require('./auth');

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/appliances', applianceRouter);

module.exports = router;
