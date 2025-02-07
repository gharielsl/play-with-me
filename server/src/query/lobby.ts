async function getLobbyById(id: string): Promise<Lobby> {
    return {
        id: '',
        maxClients: 10,
        isPrivate: false,
        owner: ''
    }
}

async function createOrUpdateLobby(lobby: Lobby) {
    return true;
}

async function deleteLobby(id: string) {
    return true;
}

export {
    getLobbyById,
    createOrUpdateLobby,
    deleteLobby
};
