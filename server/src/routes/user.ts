import express from 'express';
import { deleteUser, getUserById } from '../query/user';
import { getLobbiesByOwner } from '../query/lobby';

const route = express();

route.get('/info', async (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }
    res.send(req.user);
});

route.get('/:id/lobbies', async (req, res) => {
    res.send(await getLobbiesByOwner(req.params.id));
});

route.get('/:id', async (req, res) => {
    const user = await getUserById(req.params.id);
    if (!user) {
        res.status(404).end();
        return;
    }
    if (req.user?.id === user.id) {
        res.send(user);
    } else {
        res.send({
            id: user.id,
            displayName: user.displayName,
            isGuest: user.isGuest,
            profileImg: user.profileImg
        });
    }
});

route.delete('/:id', async (req, res) => {
    const user = await getUserById(req.params.id);
    if (!user) {
        res.status(404).end();
        return;
    }
    if (req.user?.id !== user.id) {
        res.status(403).end();
        return;
    }
    await deleteUser(user.id);
    if (!req.isAuthenticated()) {
        res.end();
        return;
    }
    req.logout((err) => {
        if (err) {
            return res.status(500).end();
        }
        res.end();
    });
});

export default route;
