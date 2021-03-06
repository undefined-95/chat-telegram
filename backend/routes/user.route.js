const { Router } = require('express');
const { userController } = require('../controllers/user.controller');

const router = Router();

router.post('/', userController.registerUser);
router.post('/login', userController.authUser);
router.get('/', userController.allUsers);

module.exports = router;
