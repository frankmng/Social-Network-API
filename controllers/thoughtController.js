const { User, Thought } = require('../models');
module.exports = {
  // Get all thoughts
	getThoughts(req, res) {
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) =>{
					console.log(err);
					res.status(500).json(err);
			})
	},
	// Get thought by ID
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			// excludes `__v` from returning in the document
			.select('-__v')
			.lean()
			.then((thought) => res.json(thought))
			.catch((err) =>{
				console.log(err);
				res.status(500).json(err);
			})
	},
	// Create thought
	createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
	// Update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
		.then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
	// Delete thought
	deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(() => 
				res.json({ message: 'User and thoughts have been deleted!' }))
				.catch((err) =>{
					console.log(err);
					res.status(500).json(err);
				})
  },
}