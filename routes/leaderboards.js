const express = require('express')
const db = require('../lib/db.js')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('leaderboards', { leaderboards: db.leaderboards() })
})

module.exports = router
