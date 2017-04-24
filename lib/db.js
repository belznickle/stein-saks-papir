// module for simplifying database
const low = require('lowdb')
const db = low('../databases/db.json')

module.exports = {
	newAccount: (name) => {
		db.get('users')
			.push({
				name: name,
				elo: 1200,
				matches: {
					played: 0,
					won: 0,
					lost: 0,
					drawn: 0
				}
			}).write()
	},
	info: (name) => {
		return db.get('users').find({ name: name }).value()
	},
	update: (name, obj) => {
		db.get('users')
			.find({ name: name })
			.assign(obj)
			.write()
	}
}
