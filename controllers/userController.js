const { User, Thought } = require('../models');

module.exports = {
  // Get all users
	getUsers(req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) =>{
				console.log(err);
				res.status(500).json(err);
			})
	},
	// Get user by ID
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			// excludes `__v` from returning in the document
			.select('-__v')
			.lean()
			.then((user) => res.json(user))
			.catch((err) =>{
				console.log(err);
				res.status(500).json(err);
			})
	},
	// Create user
	createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
	// Update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
		.then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
	// Delete user
	deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => 
				res.json({ message: 'Thought has been deleted!' }))
				.catch((err) =>{
					console.log(err);
					res.status(500).json(err);
				})
  },
}