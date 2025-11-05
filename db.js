const { MongoClient } = require('mongodb')
require('dotenv').config()

const password = process.env.PASSWORD


async function run() {
    const uri = `mongodb+srv://joaoGomes:${password}@t3ste.ckcoclb.mongodb.net/`
    const client = new MongoClient(uri)
    
    try {

        const database = client.db("projects")
        const gamesDb = database.collection("game-prices-scrapper")

        const projectionOptions = { 
            projection: {
                _id: 0    // Exclua o _id
            }
        };
        const allGames = await gamesDb.find({}, projectionOptions).toArray()

        console.log(allGames)

    } finally {
        await client.close();
    }

}

run().catch(console.dir)