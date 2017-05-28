const express = require('express')
const router = express.Router()

router.use('/game', require('./game.js'))
router.use('/leaderboards', require('./leaderboards.js'))
router.use('/lobby', require('./lobby.js'))
router.use('/login', require('./login.js'))
router.use('/logout', require('./logout.js'))
router.use('/register', require('./register.js'))
router.use('/waiting', require('./waiting.js'))

router.get('/', (req, res) => {
	res.render('home', { user: req.user })
})

module.exports = router
