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

// hvordan skrive til og hente fra database:

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
