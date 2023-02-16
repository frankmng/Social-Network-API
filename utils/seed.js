const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

	// Drop existing users
	await User.deleteMany({});
	await Thought.deleteMany({});

	const users = [
		{
			username: 'magic_mike',
			email: 'magic_mike@email.com',
		},
		{
			username: 'silly_willy',
			email: 'silly_willy@email.com',
		}
	];

	const thoughts = [
		{
			thoughtText: 'This is a great thought!',
			username: 'magic_mike'
		},
		{
			thoughtText: 'Wow, what a great thought!',
			username: 'silly_willy'
		}
	];

	// const username = [
	// 	'magic_mike',
	// 	'silly_willy',
	// 	'fantastic_frank'
	// ]
	// const email = [
	// 	'magic_mike@email.com',
	// 	'silly_willy@email.com',
	// 	'fantastic_frank@email.com'
	// ]
	
	// users.push({
	// 	username,
	// 	email,
	// });
	await User.collection.insertMany(users);
	await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
	console.info('Seeding complete! 🌱');
  process.exit(0);
})