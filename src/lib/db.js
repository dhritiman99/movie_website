import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI
export const db_name = process.env.DB_NAME
let client;
let clientPromise;
let options = {
    minPoolSize:1,
    maxPoolSize:5
}
if (!uri || !db_name){
    throw new Error('mongo uri not found !')
}
client = new MongoClient(uri,options)
clientPromise = client.connect()

export default clientPromise