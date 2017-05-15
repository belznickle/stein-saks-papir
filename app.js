const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const socketClient = require('socket.io-client')('http://localhost:3000')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const db = require('./lib/db.js')
const auth = require('./lib/auth.js')

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

io.on('connection', (socket) => {
	socket.on('createdLobby', (creator) => {
		io.emit('createdLobby', creator)
	})

	socket.on('endedLobby', (creator) => {
		io.emit('endedLobby', creator)
	})

	socket.on('gameStarted', (creator) => {
		io.emit('gameStarted', creator)
	})
})

passport.use(new Strategy((username, password, cb) => {
	auth.findByUsername(username, (err, user) => {
		if (err) return cb(err)
		if (!user) return cb(null, false)
		if (auth.hash(password) !== user.password) return cb(null, false)
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

server.listen(PORT, () => {
	console.log(`kjører på port ${PORT}, (localhost:${PORT})`)
})
