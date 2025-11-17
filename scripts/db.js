const { MongoClient } = require('mongodb')
require('dotenv').config()

const password = process.env.PASSWORD
const MONGO_URI = process.env.MONGO_URI
const DB_NAME = "projects"
const COLLECTION_NAME = "game-prices-scrapper"
let client
let db


/**
 * Establishes a connection to the MongoDB database.
 * 
 * @throws {Error} If the connection to the database fails.
 * 
 * @returns {Promise<MongoClient.Database>} A promise that resolves with the connected database.
 */
async function connectToDatabase() {
    //const uri = `mongodb+srv://joaoGomes:${password}@t3ste.ckcoclb.mongodb.net/`
    const uri = MONGO_URI

    if (db) return db

    try {

        client = new MongoClient(uri, {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            },
            serverSelectionTimeoutMS: 5000,
        })
        await client.connect()

        db = client.db(DB_NAME)
        return db
    }
    catch (error) {
        if (client)
            await client.close()

        throw error
    }
}

/**
 * Retrieves all games from the database.
 * 
 * @throws {Error} If the connection to the database has not been established.
 * 
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of objects, each representing a game.
 */
async function getAllGames() {
    if (!db)
        throw new Error("Connection not established")

    try {

        const gamesDb = db.collection(COLLECTION_NAME)
        // const projectionOptions = {
        //     projection: {
        //         _id: 0
        //     }
        // }
        const allGames = await gamesDb.find({}).toArray()

        return allGames
    }
    catch (error) {
        console.error("Error trying to access the database:", error)
        throw error
    }
}

module.exports = {
    connectToDatabase,
    getAllGames
}