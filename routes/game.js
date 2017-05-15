const express = require('express')
const localSocket = require('socket.io-client')('http://localhost:3000')
const lobby = require('../lib/lobby.js')
const db = require('../lib/db.js')
const router = express.Router()

router.get('/:creator', (req, res) => {
	if (!req.user) {
		res.redirect('/login')
	} else {
		if (lobby.exists(req.params.creator)) {
			let you = req.user.username
			let opponent

			if (you !== req.params.creator) {
				let game = lobby.getGame(req.params.creator)
				if (game.opponent !== you && game.opponent !== null) {
					res.redirect('/lobby')
					return
				} else {
					lobby.join(req.params.creator, you)
					opponent = req.params.creator
					localSocket.emit('gameStarted', req.params.creator)
				}
			} else {
				let game = lobby.getGame(req.params.creator)
				if (!game.opponent) {
					res.redirect('/lobby')
					return
				} else {
					opponent = game.opponent
				}
			}

			you = db.info(you)
			opponent = db.info(opponent)
			res.render('game', { you: you, opponent: opponent })
		} else {
			res.redirect('/lobby')
		}
	}
})

module.exports = router
