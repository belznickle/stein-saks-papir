// module for å kalkulere elo til spillere
const low = require('lowdb')
const db = low('../databases/db.json')

module.exports = () => {

}

// hvordan skrive til og hente fra database:

// lager en ny bruker
/*
db.get('users')
	.push({
		name: 'enra',
		elo: 1200,
		matches: {
			played: 0,
			won: 0,
			lost: 0,
			drawn: 0
		}
	}).write()
*/

// henter informasjon om enra i databasen
/*
let enra = db.get('users').find({ name: 'enra' }).value()
*/

// endrer informasjonen
/*
enra.elo = 2400
enra.matches.played++
enra.matches.won++
*/

// oppdaterer databasen til å være det samme som objektet enra
/*
db.get('users')
	.find({ name: 'enra' })
	.assign(enra)
	.write()
*/

// for mer informasjon: https://github.com/typicode/lowdb
