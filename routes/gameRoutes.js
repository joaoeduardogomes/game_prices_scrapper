const express = require('express')
const router = express.Router()
const { fetchGames, updatePrices } = require('../controllers/gameController')

// GET /api/games
router.get('/games', async (req, res) => {
    try {
        const games = await fetchGames()
        res.status(200).json({ status: "success", data: games })
    }
    catch (error) {
        console.error("[Routes] Error fetching games", error)
        res.status(500).json({ status: 'error', message: 'Server error' })
    }
})

// POST /api/games/update
router.post('/games/update', async (req, res) => {
    try {
        await updatePrices()
        res.status(200).json({ status: 'success', message: 'Prices updated' })
    } catch (error) {
        console.error('[Routes] Error updating prices', error)
        res.status(500).json({ status: 'error', message: 'Failed to update prices' })
    }
})

module.exports = router