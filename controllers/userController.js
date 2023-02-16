const { User, Thought } = require('../models');

module.exports = {
  // Get all users
	getUsers(req, res) {
		User.find()
			.select('-__v')
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
	// Add friend
	async addFriend(req, res) {
		const { userId, friendId } = req.params;
		try {
			const user = await User.findById(userId);
			const friend = await User.findById(friendId);
	
			// Check if friend is already in the user's friend list
			const friendIndex = user.friends.findIndex(f => f.equals(friend._id));
			if (friendIndex !== -1) {
				return res.status(400).json({ message: 'Friend already in user\'s friend list' });
			}
			
			// Push friend into user's friend list
			user.friends.push(friend);
			await user.save();
	
			return res.status(200).json({ message: 'Friend added to user\'s friend list' });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},
	// Delete friend
	async removeFriend(req, res) {
		const { userId, friendId } = req.params;
		try {
			const user = await User.findById(userId);
			const friend = await User.findById(friendId);
			
			// Remove friend from user's friend list
			user.friends.pop(friend);
			await user.save();
	
			return res.status(200).json({ message: 'Friend removed from user\'s friend list' });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}