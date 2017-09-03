// module for å kalkulere elo til spillere
const db = require('./db.js')

module.exports = (playerOne, playerTwo, result_player_1) => {
    playerOne = db.info(playerOne)
    playerTwo = db.info(playerTwo)

    let points_player_1
    let points_player_2

    if (result_player_1 === true) {
        points_player_1 = 1
        points_player_2 = 0
        playerOne.won++
        playerTwo.lost++
    }
    else if (result_player_1 === false) {
        points_player_1 = 0
        points_player_2 = 1
        playerOne.lost++
        playerTwo.won++
    }
    else {
        points_player_1 = 0.5
        points_player_2 = 0.5
        playerOne.drawn++
        playerTwo.drawn++
    }

    k = 20
    expected_score_player_1 = 1 / ( 1 + Math.pow(10, (playerTwo.elo - playerOne.elo) / 400))
    expected_score_player_2 = 1 / ( 1 + Math.pow(10, (playerOne.elo - playerTwo.elo) / 400))
    playerOne.elo += k * (points_player_1 - expected_score_player_1)
    playerTwo.elo += k * (points_player_2 - expected_score_player_2)
    db.update(playerOne.name, playerOne)
    db.update(playerTwo.name, playerTwo)
	return {
		creator: playerOne.elo,
		opponent: playerTwo.elo
	}
}
