const { MongoClient } = require('mongodb')
require('dotenv').config()

const password = process.env.PASSWORD
const DB_NAME = "projects"
const COLLECTION_NAME = "game-prices-scrapper"
let client
let db

async function connectToDatabase() {
    const uri = `mongodb+srv://joaoGomes:${password}@t3ste.ckcoclb.mongodb.net/`
    
    if (db) return db
    
    try {

        client = new MongoClient(uri)
        await client.connect()
        
        db = client.db(DB_NAME)
        return db
    }
    catch(error) {
        if (client)
            await client.close()

        throw error
    }
}

async function getAllGames() {
    if (!db)
        throw new Error("Connection not established")

    try {

        const gamesDb = db.collection(COLLECTION_NAME)
        const projectionOptions = {
            projection: {
                _id: 0
            }
        }
        const allGames = await gamesDb.find({}, projectionOptions).toArray()
        
        return allGames
    }
    catch(error) {
        console.error("Error trying to access the database:", error)
        throw error
    }
}

module.exports = {
    connectToDatabase,
    getAllGames
}