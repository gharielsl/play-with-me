import { Db, MongoClient } from 'mongodb';

let connection: {
    database: Db,
    client: MongoClient
};

async function connect() {
    const client = new MongoClient(process.env.CONNECTION_STRING as string);
    await client.connect();
    const database = client.db(process.env.DATABASE_NAME as string);
    connection = {
        client,
        database
    };
}

function getConnection() {
    return connection;
}

export {
    connect,
    getConnection
};
