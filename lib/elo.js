// module for å kalkulere elo til spillere
const low = require('lowdb')
const db = require('./db')

module.exports = () => {

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
