// module for simple bruk av database
const low = require('lowdb')

module.exports = {
	info(name) {
		let db = low('./db/stats.json')
		return db.get('users').find({ name: name }).value()
	},
	update(name, obj) {
		let db = low('./db/stats.json')
		db.get('users')
			.find({ name: name })
			.assign(obj)
			.write()
		sort()
	},
	leaderboards()  {
		sort()
		let db = low('./db/stats.json')
		return(db.get('users')
			.sortBy('rank')
			.take(db.get('users').size().value())
			.value())
	}
}

function sort() {
	let db = low('./db/stats.json')
	let users = (db.get('users')
		.sortBy('elo')
		.take(db.get('users').size().value())
		.value())
	let ranks = users.length
	db.set('users', []).write()
	for (let user of users) {
		user.rank = ranks
		ranks--
		db.get('users').push(user).write()
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
