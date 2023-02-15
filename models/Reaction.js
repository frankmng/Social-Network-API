const { Schema } = require('mongoose');
const mongoose = require('mongoose');

// Function to format createdDt
const formatDate = (createdDt) => {
	const date = new Date(createdDt);
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}

// Schema for Reaction model
const reactionSchema = new Schema(
	{
		reactionId: {
			type: mongoose.Schema.Types.ObjectId,
			default: new mongoose.Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: formatDate,
		},    
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

module.exports = reactionSchema;