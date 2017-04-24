const express = require('express')
const app = express()
const db = require('./lib/db')

const PORT = 4000
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.send('hello')
})

app.get('/leaderboards', (req, res) => {
	res.render('leaderboards', { leaderboards: db.leaderboards() })
})

app.listen(PORT, () => {
	console.log(`kjører på port ${PORT}, (localhost:4000)`)
})
