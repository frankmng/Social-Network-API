const { User, Thought } = require('../models');
const { findById } = require('../models/User');
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
		const { thoughtId } = req.params
		Thought.findOne({ _id: thoughtId })
			// excludes `__v` from returning in the document
			.select('-__v')
			// .lean()
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
		const { thoughtId } = req.params
    Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
		.then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
	// Delete thought
	deleteThought(req, res) {
		const { thoughtId } = req.params
    Thought.findOneAndDelete({ _id: thoughtId })
      .then(() => 
				res.json({ message: 'User and thoughts have been deleted!' }))
				.catch((err) =>{
					console.log(err);
					res.status(500).json(err);
				})
  },
	// Add reaction
	addReaction(req, res) {
		const { thoughtId } = req.params
		const newReaction = { 
			username: req.body.username, 
			reactionBody: req.body.reactionBody 
		};
		Thought.findOneAndUpdate(
			// Filter object to retrieve single thought
			{ _id: thoughtId },
			// Push the new reaction object to the reactions array
			{ $push: { reactions: newReaction } },
			// Return the updated thought and run validation
			{ new: true, runValidators: true })
			.then(updatedThought => {
				res.status(200).json({ message: 'Reaction added to thoughts', updatedThought })
			})  
		.catch(err => {
			return res.status(500).json({ message: err.message });
		})
	},
	// Remove reaction
	removeReaction(req, res) {
		const { thoughtId, reactionId } = req.params
		Thought.findOneAndUpdate(
			// Filter object to retrieve single thought
			{ _id: thoughtId },
			// Remove the reaction object from the reactions array
			{ $pull: { reactions: { _id: reactionId } } },
			// Return the updated thought and run validation
			{ new: true, runValidators: true })
		.then(updatedThought => {
			if (!updatedThought) {
				return res.status(404).json({ message: 'Thought not found' });
			}
			res.status(200).json({ message: 'Reaction removed from thought' })
		})  
		.catch(err => {
			return res.status(500).json({ message: err.message });
		})
	}
}