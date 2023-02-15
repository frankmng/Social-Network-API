const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

// Schema for User model
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Re-enter a valid email address']
      },
      thoughts: [
        {
					type: mongoose.Schema.Types.ObjectId,
          ref: 'Thoughts',
					default: [],
        },
      ],
      friends: [
        {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					default: [],
        }
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
    }
  );

// Virtual property to get count of friends per user
userSchema
	.virtual('friendCount')
	.get(function(){
			return this.friends.length
});


// Initialize our model
const User = model('user', userSchema);

module.exports = User;