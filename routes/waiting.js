const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	if (!req.user) {
		res.redirect('/')
		return
	}

	res.render('waiting', { user: req.user.username })
})

module.exports = router
