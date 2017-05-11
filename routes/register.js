const express = require('express')
const auth = require('../lib/auth.js')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('register')
})

router.post('/', (req, res) => {
	let username = req.body.username
	let password = req.body.password

	if (auth.newAccount(username, password)) { // if success
		res.render('register', { error: 'registrert' })
	} else {
		res.render('register', { error: 'brukernavnet er allerede i bruk' })
	}
})

module.exports = router
