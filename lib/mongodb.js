import {MongoClient} from 'mongodb'

const url = process.env.MONGO_DB_URL

const options = {
    useUnifiedTopology:true,
    useNewUrlParser:true
}

let client
let clientPromise

if (!process.env.MONGO_DB_URL) {
    throw new Error("Check a file .env.local")
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(url, options)
        global._mongoClientPromise = client.connect()
    }else{
        clientPromise = global._mongoClientPromise
    }
}else{
    client = new MongoClient(url, options)
    clientPromise = client.connect()
}

export default clientPromise