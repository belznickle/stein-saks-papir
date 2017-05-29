const elo = require('./elo.js')

module.exports = (game) => {
	let steinSaksPapirAr = ["stein", "saks", "papir", "stein"]
	if (game.creatorPick === game.opponentPick){
		elo(game.creator, game.opponent, null)
	}
	else {
		for (let i = 0; i < 3; i++) {
			if (game.creatorPick === steinSaksPapirAr[i] && game.opponentPick === steinSaksPapirAr[i+1]) {
				elo(game.creator, game.opponent, true)
			}
		}
		for (let i = 4; i > 1; i--) {
			if(game.creatorPick === steinSaksPapirAr[i] && game.opponentPick === steinSaksPapirAr[i-1]){
				elo(game.creator, game.opponent, false)
			}
		}
	}
}
