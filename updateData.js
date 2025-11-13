const { connectToDatabase, getAllGames } = require('./db')
const { scrapePSNGame } = require('./scrapperPSN')

async function updateAllPrices() {
    const db = await connectToDatabase()
    const games = await getAllGames()
    const col = db.collection('game-prices-scrapper')

    for (const game of games) {
        console.log(`[UPDATE] Checando ${game.name}...`)
        const scraped = await scrapePSNGame(game.url)

        if (scraped) {
            const title = scraped.title
            await col.updateOne(
                { _id: game._id },
                { $set: { title, normalPrice: scraped.normalPrice, currentPrice: scraped.currentPrice } }
            )
            console.log(`Updated: ${scraped.title} - R$${scraped.currentPrice}`)
        } else {
            console.log(`Couldn't get data from ${game.title}`)
        }
    }
}

updateAllPrices()
    .then(() => console.log('Success'))
    .catch(err => console.error('Error:', err))

    module.exports = { updateAllPrices }