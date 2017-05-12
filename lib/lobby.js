const low = require('lowdb')

module.exports = {
	create(creator) {
		let db = low('./db/games.json')
		if (db.get('games')
			.find({ creator: creator })
			.value()) return false
		else {
			db.get('games')
				.push({
					creator: creator,
					creatorPick: null,
					opponent: null,
					opponentPick: null
				}).write()
			return true
		}
	},
	end(creator) {
		let db = low('./db/games.json')
		db.get('games')
			.remove({ creator: creator })
			.write()
	},
	exists(creator) {
		let db = low('./db/games.json')
		if (db.get('games').find({ creator: creator }).value()) return true
		return false
	},
	getAll() {
		let db = low('./db/games.json')
		return db.get('games').value()
	}
}
