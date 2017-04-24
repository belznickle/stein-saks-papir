const express = require('express')
const app = express()

const PORT = 4000
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.send('hello')
})

app.listen(PORT, () => {
	console.log(`kjører på port ${PORT}, (localhost:4000)`)
})
