const express = require('express')
const localSocket = require('socket.io-client')('http://localhost:3000')
const lobby = require('../lib/lobby.js')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('lobby', { games: lobby.getAll() })
})

router.post('/create', (req, res) => {
	if (req.user) {
		if (!lobby.exists(req.user.username)) {
			lobby.create(req.user.username)
			localSocket.emit('createdLobby', req.user.username)
		}
	}

	res.redirect('/lobby') // temp
})

router.post('/delete', (req, res) => {
	if (req.user) {
		lobby.end(req.user.username)
		localSocket.emit('endedLobby', req.user.username)
	}

	res.redirect('/lobby')
})

module.exports = router
