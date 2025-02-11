import { getConnection } from "./connection";

async function getLobbyById(id: string): Promise<Lobby | null> {
    const { database } = getConnection();
    const collection = database.collection('Lobbies');
    const lobby = await collection.findOne({ id });
    return lobby as unknown as Lobby || null;
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
    createOrUpdateLobby,
    deleteLobby
};
