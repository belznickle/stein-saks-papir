const express = require('express')
const localSocket = require('socket.io-client')('http://localhost:3000')
const lobby = require('../lib/lobby.js')
const router = express.Router()

router.get('/', (req, res) => {
	let user
	if (req.user) {
		user = req.user.username
	} else {
		user = null
	}

	res.render('lobby', { user: user, games: lobby.getAll() })
})

router.post('/create', (req, res) => {
	if (!req.user) {
		res.redirect('/login')
	} else {
		if (!lobby.exists(req.user.username)) {
			lobby.create(req.user.username)
			localSocket.emit('createdLobby', req.user.username)
		}

		res.redirect('/temp')
	}
})

router.post('/delete', (req, res) => {
	if (!req.user) {
		res.redirect('/login')
	} else {
		lobby.end(req.user.username)
		localSocket.emit('endedLobby', req.user.username)
		res.redirect('/lobby')
	}
})

module.exports = router
