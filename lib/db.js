// module for simple bruk av database
const low = require('lowdb')
let db = low('./db/stats.json')

module.exports = {
	info: (name) => {
		db = low('./db/stats.json')
		return db.get('users').find({ name: name }).value()
	},
	update: (name, obj) => {
		db = low('./db/stats.json')
		db.get('users')
			.find({ name: name })
			.assign(obj)
			.write()

		// sorterer
		db = low('./db/stats.json')
		let users = (db.get('users')
			.sortBy('elo')
			.take(db.get('users').size().value())
			.value())
		let ranks = users.length
		db.set('users', []).write()
	},
	leaderboards: () => {
		db = low('./db/stats.json')
		return(db.get('users')
			.sortBy('rank')
			.take(db.get('users').size().value())
			.value())
	}
}

// hvordan skrive til og hente fra database:

// antar at du tar utgangs punkt fra lib/
/*
const db = require('./db/db.js') kan være annet sted
*/

// henter informasjon om enra i databasen
/*
let enra = db.info('enra')
*/

// endrer informasjonen
/*
enra.elo = 2400
enra.played++
enra.won++
*/

// oppdaterer databasen til å være det samme som objektet enra
/*
db.update('enra', enra)
*/
