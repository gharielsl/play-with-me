import { getConnection } from './connection';

async function getUserById(id: string): Promise<User | null> {
    const { database } = getConnection();
    const collection = database.collection('Users');
    const user = await collection.findOne({ id });
    return user as unknown as User || null;
}

async function createOrUpdateUser(user: User) {
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

export {
    getUserById,
    createOrUpdateUser
};
