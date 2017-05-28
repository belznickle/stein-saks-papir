const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('waiting', { user: req.user.username })
})

module.exports = router
