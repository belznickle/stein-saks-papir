// module for simple bruk av database
const low = require('lowdb')
const db = low('../databases/db.json')

module.exports = {
	newAccount: (name) => {
		db.get('users')
			.push({
				rank: undefined,
				name: name,
				elo: 1200,
				won: 0,
				lost: 0,
				drawn: 0
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
	},
	sortRanks: () => {
		let users = (db.get('users')
			.sortBy('elo')
			.take(db.get('users').size().value())
			.value())
		db.set('users', []).write()
		let ranks = users.length
		for (let user of users) {
			user.rank = ranks
			ranks--
			db.get('users').push(user).write()
		}
	},
	leaderboards: () => {
		return (db.get('users')
			.sortBy('rank')
			.take(db.get('users').size().value())
			.value())
	}
}

// hvordan skrive til og hente fra database:

// antar at du tar utgangs punkt fra lib/
/*
const db = require('./db')
*/

// lager en ny bruker
/*
db.newAccount('enra')
*/

// henter informasjon om enra i databasen
/*
let enra = db.info('enra')
*/

// endrer informasjonen
/*
enra.elo = 2400
enra.matches.played++
enra.matches.won++
*/

// oppdaterer databasen til å være det samme som objektet enra
/*
db.update('enra', enra)
*/
