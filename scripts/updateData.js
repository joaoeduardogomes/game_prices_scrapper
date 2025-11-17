const { connectToDatabase, getAllGames } = require('./db')
const { scrapePSNGame } = require('./scrapperPSN')

async function updateAllPrices() {
    const db = await connectToDatabase()
    const games = await getAllGames()
    const col = db.collection('game-prices-scrapper')

    for (const game of games) {
        console.log(`[CHECKING] ${game.name}...`)
        const scraped = await scrapePSNGame(game.url)

        if (scraped) {
            const fieldsToUpdate = ["title", "normalPrice", "currentPrice"]

            for (const field of fieldsToUpdate) {
                await checkAndUpdate(col, game, field, game[field], scraped[field])
            }
        } else {
            console.log(`Couldn't get data from ${game.title}`)
        }
    }
}

async function checkAndUpdate(col, game, fieldName, oldValue, newValue) {
    if (oldValue === newValue)
        return

    await col.updateOne(
        { _id: game._id },
        { $set: { [fieldName]: newValue } }
    )

    console.log(`[UPDATE] Changed ${fieldName}: ${oldValue} → ${newValue}`)
}


module.exports = { updateAllPrices }