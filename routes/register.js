const express = require('express')
const auth = require('../lib/auth.js')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('register')
})

router.post('/', (req, res) => {
	let username = req.body.username
	let password = req.body.password
	let error = auth.newAccount(username, password)
	res.render('register', { error: error })
})

module.exports = router
