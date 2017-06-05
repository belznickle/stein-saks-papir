const express = require('express')
const lobby = require('../lib/lobby.js')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('join', { games: lobby.getAll() })
})

module.exports = router
