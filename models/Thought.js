const { Schema, model } = require('mongoose');

// Schema for Thought model
const thoughtSchema = new Schema(
    {
			thoughtText: {
				type: String,
				maxlength: 280,
				minlength: 1,
      },
      createdAt: {
        type: Date,
        default: Date.now,
				get: formatDate,
      },
			username: {
        type: String,
        required: true,
      },
			reactions: [reactionSchema]
    },
    {
      toJSON: {
				virtuals: true,
        getters: true,
      },
			id: false,
    }
  );

const formatDate = (createdDt) => {
	const date = new Date(createdDt);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}

// Virtual property to get count of reactions per thought
thoughtSchema
	.virtual('reactionCount')
	.get(() => {
			return this.reactions.length
})

// Initialize our model
const Thoughts = model('thoughts', userSchema);

module.exports = Thoughts;