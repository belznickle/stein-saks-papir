const express = require('express')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const db = require('./lib/db.js')
const auth = require('./lib/auth.js')
const app = express()
const PORT = 3000
const SECRET = 'this is a big secret'

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('cookie-parser')())
app.use(require('express-session')({ secret: SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new Strategy((username, password, cb) => {
	auth.findByUsername(username, (err, user) => {
		if (err) return cb(err)
		if (!user) return cb(null, false)
		if (user.password !== password) return cb(null, false)
		return cb(null, user)
	})
}))

passport.serializeUser((user, cb) => {
	cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
	auth.findById(id, (err, user) => {
		if (err) return cb(err)
		cb(null, user)
	})
})

app.use('/', require('./routes/index.js')) // henter alle routes herifra

app.listen(PORT, () => {
	console.log(`kjører på port ${PORT}, (localhost:${PORT})`)
})
