const router = require('express').Router();
const { 
  getUsers,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../../controllers/userController');

// path: /api/users
router.route('/').get(getUsers).post(createUser);

// path: /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
module.exports = router;

