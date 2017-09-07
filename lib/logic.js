const localSocket = require('socket.io-client')('http://localhost:3000')
const eloCalc = require('./elo.js')

module.exports = (req, res, game) => {
	let steinSaksPapirAr = ["stein", "saks", "papir", "stein"]
	if (game.creatorPick === game.opponentPick) {
		const elo = eloCalc(game.creator, game.opponent, null)
		localSocket.emit('gameEnded', {
			creator: game.creator,
			opponent: game.opponent,
			creatorPick: game.creatorPick,
			opponentPick: game.opponentPick,
			winner: 'uavgjort',
			elo: elo
		})
	}
	else {
		for (let i = 0; i < 3; i++) {
			if (game.creatorPick === steinSaksPapirAr[i] && game.opponentPick === steinSaksPapirAr[i+1]) {
				const elo = eloCalc(game.creator, game.opponent, true)
				localSocket.emit('gameEnded', {
					creator: game.creator,
					opponent: game.opponent,
					creatorPick: game.creatorPick,
					opponentPick: game.opponentPick,
					winner: game.creator,
					elo: elo
				})
			}
		}
		for (let i = 3; i > 0; i--) {
			if(game.creatorPick === steinSaksPapirAr[i] && game.opponentPick === steinSaksPapirAr[i-1]) {
				const elo = eloCalc(game.creator, game.opponent, false)
				localSocket.emit('gameEnded', {
					creator: game.creator,
					opponent: game.opponent,
					creatorPick: game.creatorPick,
					opponentPick: game.opponentPick,
					winner: game.opponent,
					elo: elo
				})
			}
		}
	}
}
