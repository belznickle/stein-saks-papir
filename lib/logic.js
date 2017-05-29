const elo = require('./elo.js')

module.exports = (game) => {
	var steinSaksPapirAr = ["stein", "saks", "papir", "stein"]
	if (game.creatorPick === game.opponentPick){
		elo(game.creator, game.opponent, null)
	}
	else {
		for (var i = 0; i < 3; i++) {
			if (game.creatorPick === steinSaksPapirAr[i] && game.opponentPick === steinSaksPapirAr[i+1]) {
				elo(game.creator, game.opponent, true)
			}
		}
		for (var i = 4; i > 1; i--) {
			if(game.creatorPick === steinSaksPapirAr[i] && game.opponentPick === steinSaksPapirAr[i-1]){
				elo(game.creator, game.opponent, false)
			}
		}
	}
}
