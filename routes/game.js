const express = require('express')
const localSocket = require('socket.io-client')('http://localhost:3000')
const lobby = require('../lib/lobby.js')
const db = require('../lib/db.js')
const logic = require('../lib/logic.js')
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
					localSocket.emit('lobbyEnded', req.params.creator)
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

router.post('/', (req, res) => {
	if (!req.user) {
		res.redirect('/login')
		return
	}
	// for fremtid: forsikre at en spiller bare kan være i 1 game om gangen
	let username = req.user.username
	lobby.setPick(username, req.body.choice)
	if (lobby.getGame(username)) {
		let game = lobby.getGame(username)
		if (game.opponentPick) {
			logic(game)
			lobby.end(game.creator)
			localSocket.emit('gameEnded', game.creator, game.opponent)
			res.redirect('/lobby')
			return
		}
	} else if (lobby.getGameOpponent(username)) {
		let game = lobby.getGameOpponent(username)
		if (game.creatorPick) {
			logic(game)
			lobby.end(game.creator)
			localSocket.emit('gameEnded', game.creator, game.opponent)
			res.redirect('/lobby')
			return
		}
	} else {
		res.redirect('/lobby')
		return
	}

	res.redirect('/waiting')
})

module.exports = router
