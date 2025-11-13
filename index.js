const express = require('express')
const path = require('path')
const { connectToDatabase, getAllGames } = require('./db')
const { updateAllPrices } = require('./scrapperPSN')

const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/api/games', async (req, res) => {
    try {
        const gameData = await getAllGames()
        res.status(200).json({
            status: "success",
            data: gameData
        })
    }
    catch (error) {
        console.error("[Express] Error trying to process '/api/games'", error)
        res.status(500).json({ status: "error", message: "Server internal error trying to fetch data" })
    }
})

//? POST
app.post('/api/games/update', async (req, res) => {
    try {
        await updateAllPrices()
        res.status(200).json({ status: 'success', message: 'Prices updated successfully' })
    }
    catch (error) {
        console.error('[Express] Error trying to update prices', error)
        res.status(500).json({ status: 'error', message: 'Failed to update prices' })
    }
})

async function startApp() {
    try {
        // CONEXÃO ÚNICA: Conecta ao DB e mantém a conexão aberta antes de TUDO
        await connectToDatabase()

        // Inicia o servidor Express
        app.listen(PORT, () => {
            console.log(`[Express] server running on: http://localhost:${PORT}`)
            console.log("-----------------------------------------------------")
        })

    } catch (error) {
        console.error("Error trying to start application. Ending process.", error)
        process.exit(1)
    }
}

startApp()