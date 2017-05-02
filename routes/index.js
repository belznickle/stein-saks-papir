const express = require('express')
const router = express.Router()

router.use('/leaderboards', require('./leaderboards.js'))
router.use('/login', require('./login.js'))
router.use('/logout', require('./logout.js'))
router.use('/register', require('./register.js'))

router.get('/', (req, res) => {
	res.render('home', { user: req.user })
})

module.exports = router
