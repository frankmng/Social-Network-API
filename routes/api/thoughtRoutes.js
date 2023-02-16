const router = require('express').Router();
const { 
  getThoughts,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	removeReaction
} = require('../../controllers/thoughtController');

// path: /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// path: /api/thoughts
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// path: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

// path: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;