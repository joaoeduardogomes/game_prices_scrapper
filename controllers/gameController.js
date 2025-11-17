const { getAllGames } = require('../scripts/db')
const { updateAllPrices } = require('../scripts/updateData')

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