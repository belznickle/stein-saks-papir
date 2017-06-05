const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	if (!req.user) {
		res.redirect('/')
		return
	}

	res.render('temp', { user: req.user.username })
})

module.exports = router
