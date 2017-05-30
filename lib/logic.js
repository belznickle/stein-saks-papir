const localSocket = require('socket.io-client')('http://localhost:3000')
const elo = require('./elo.js')

module.exports = (req, res, game) => {
	let steinSaksPapirAr = ["stein", "saks", "papir", "stein"]
	if (game.creatorPick === game.opponentPick){
		elo(game.creator, game.opponent, null)
		localSocket.emit('gameEnded', game.creator, game.opponent, 'uavgjort')
		res.render('waiting', { user: req.user.username, winner: 'uavgjort' })
	}
	else {
		for (let i = 0; i < 3; i++) {
			if (game.creatorPick === steinSaksPapirAr[i] && game.opponentPick === steinSaksPapirAr[i+1]) {
				elo(game.creator, game.opponent, true)
				localSocket.emit('gameEnded', game.creator, game.opponent, game.creator)
				res.render('waiting', { user: req.user.username, winner: game.creator })
			}
		}
		for (let i = 4; i > 1; i--) {
			if(game.creatorPick === steinSaksPapirAr[i] && game.opponentPick === steinSaksPapirAr[i-1]){
				elo(game.creator, game.opponent, false)
				localSocket.emit('gameEnded', game.creator, game.opponent, game.opponent)
				res.render('waiting', { user: req.user.username, winner: game.opponent })
			}
		}
	}
}
