import { getConnection } from "./connection";

async function getLobbyById(id: string) {
    const { database } = getConnection();
    const collection = database.collection('Lobbies');
    const lobby = await collection.findOne({ id });
    return lobby as unknown as Lobby || null;
}

async function getLobbiesByOwner(owner: string) {
    const { database } = getConnection();
    const collection = database.collection('Lobbies');
    const lobbies = await collection.find({ owner }).toArray();
    return lobbies as unknown as Lobby[];
}

async function createOrUpdateLobby(lobby: Lobby) {
    const { database } = getConnection();
    const collection = database.collection('Lobbies');
    const existingLobby = await collection.findOne({ id: lobby.id });

    if (existingLobby) {
        await collection.updateOne({ id: lobby.id }, { $set: lobby });
    } else {
        await collection.insertOne(lobby);
    }
    return true;
}

async function deleteLobby(id: string) {
    const { database } = getConnection();
    const collection = database.collection('Lobbies');
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
}

export {
    getLobbyById,
    getLobbiesByOwner,
    createOrUpdateLobby,
    deleteLobby
};
