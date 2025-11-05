const { MongoClient } = require('mongodb')
require('dotenv').config()

const password = process.env.PASSWORD
const DB_NAME = "projects"
const COLLECTION_NAME = "game-prices-scrapper"


async function run() {
    const uri = `mongodb+srv://joaoGomes:${password}@t3ste.ckcoclb.mongodb.net/`
    const client = new MongoClient(uri)

    try {

        const database = client.db(DB_NAME)
        const gamesDb = database.collection(COLLECTION_NAME)

        const projectionOptions = {
            projection: {
                _id: 0
            }
        };
        const allGames = await gamesDb.find({}, projectionOptions).toArray()

        console.log(allGames)

    } catch (error) {
        console.error("Error trying to access the database:", error);
        throw error;
    } finally {
        await client.close();
    }

}

run().catch(console.dir)