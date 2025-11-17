const { getAllGames } = require('../db')
const { updateAllPrices } = require('../updateData')

async function fetchGames() {
    return await getAllGames()
}

async function updatePrices() {
    return await updateAllPrices()
}

module.exports = {
    fetchGames,
    updatePrices
}