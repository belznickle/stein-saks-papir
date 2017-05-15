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
	join(creator, you) {
		let db = low('./db/games.json')
		db.get('games')
			.find({ creator: creator })
			.assign({ opponent: you })
			.write()
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
	getGame(creator) {
		let db = low('./db/games.json')
		return db.get('games').find({ creator: creator }).value()
	},
	getAll() {
		let db = low('./db/games.json')
		return db.get('games').value()
	}
}
