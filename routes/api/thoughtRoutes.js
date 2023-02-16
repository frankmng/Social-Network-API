const router = require('express').Router();
const { 
  getThoughts,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought
} = require('../../controllers/thoughtController');

// path: /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// path: /api/thoughts
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)
module.exports = router;