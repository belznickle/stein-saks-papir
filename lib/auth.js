// mye av authentication er fra https://github.com/passport/express-4.x-local-example
// det er bra kommentert, du forstår denne koden hvis du leser der

const low = require('lowdb')
const db = low('./db/auth.json')
const stats = low('./db/stats.json')

module.exports = {
	findByUsername: (username, cb) => {
		let users = db.get('users')

		for (let user of users) {
			if (user.username === username) {
				return cb(null, user)
			}
		}

		return cb(null, null)
	},
	findById: (id, cb) => {
		let idx = id - 1
		let users = db.get('users').value()

		if (users[idx]) {
			cb(null, users[idx])
		} else {
			cb(new Error('User ' + id + ' does not exist'))
		}
	},
	newAccount: (username, password) => {
		let users = db.get('users').value()
		let accountExists = false

		for (let obj of users) {
			if (obj.username === username) accountExists = true
		}

		if (!accountExists) {
			db.get('users')
				.push({
					id: users.length + 1,
					username: username,
					password: password // NO HASHING CURRENTLY
				}).write()

			// defines stats
			stats.get('users')
				.push({
					rank: undefined,
					name: username,
					elo: 1200,
					won: 0,
					lost: 0,
					drawn: 0
				}).write()
			return true
		} else {
			return false
		}
	}
}
