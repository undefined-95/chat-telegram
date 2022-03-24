const { Router } = require('express');

const router = Router();

router.use('/user', require('./user.route'));

module.exports = router;
