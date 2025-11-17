const express = require('express')
const path = require('path')
const { connectToDatabase } = require('./scripts/db')
const gameRoutes = require('./routes/gameRoutes')

const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.json())

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Rotas da API
app.use('/api', gameRoutes)

async function startApp() {
    try {
        await connectToDatabase()

        app.listen(PORT, () => {
            console.log(`[Express] Running at http://localhost:${PORT}`)
            console.log('----------------------------------------------')
        })
    } catch (error) {
        console.error('Failed to start.', error)
        process.exit(1)
    }
}

startApp()
