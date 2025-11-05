const express = require('express')

const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile("index.html", {root: "public"})
})
app.get('/api/games', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}/`)
})