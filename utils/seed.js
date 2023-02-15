const connection = require('../config/connection');
const { User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

	// Drop existing users
	await User.deleteMany({});
	
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

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
})