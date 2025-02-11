import { getConnection } from './connection';

async function getUserById(id: string) {
    const { database } = getConnection();
    const collection = database.collection('Users');
    const user = await collection.findOne({ id });
    return user as unknown as PlayWithMeUser || null;
}

async function createOrUpdateUser(user: PlayWithMeUser) {
    const { database } = getConnection();
    const collection = database.collection('Users');
    const existingUser = await collection.findOne({ id: user.id });

    if (existingUser) {
        await collection.updateOne({ id: user.id }, { $set: user });
    } else {
        await collection.insertOne(user);
    }
    return true;
}

async function deleteUser(id: string) {
    const { database } = getConnection();
    const collection = database.collection('Users');
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
}

export {
    getUserById,
    createOrUpdateUser,
    deleteUser
};
