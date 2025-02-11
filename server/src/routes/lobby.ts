import express from 'express';
import uuid from 'uuid';
import { body, validationResult } from 'express-validator';
import { createOrUpdateLobby, deleteLobby, getLobbyById } from '../query/lobby';

const route = express();

route.get('/:id', async (req, res) => {
    const lobby = await getLobbyById(req.params.id);
    if (!lobby) {
        res.status(404).end();
        return;
    }
    res.send(lobby);
});

route.post(
    '/:id',
    body('maxClients').optional().isInt({ min: 1, max: 10 }),
    body('isPrivate').isBoolean(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        let id = req.params?.id;
        const existing = await getLobbyById(req.params?.id);
        if (!existing) {
            id = uuid.v4();
        } else {
            if (req.user?.id !== existing.owner) {
                res.status(403).end();
                return;
            }
        }
        const payload = {
            id,
            isPrivate: req.body.isPrivate,
            maxClients: req.body.maxClients || 10,
            owner: ''
        };
        const result = await createOrUpdateLobby(payload);
        if (result && existing) {
            res.status(200).send(payload);
        } else if (result) {
            res.status(201).send(payload);
        } else {
            res.status(500).end();
        }
    }
);

route.delete('/:id', async (req, res) => {
    const lobby = await getLobbyById(req.params?.id);
    if (!lobby) {
        res.status(404).end();
        return;
    }
    if (req.user?.id !== lobby.owner) {
        res.status(403).end();
        return;
    }
    const result = await deleteLobby(lobby.id);
    res.status(result ? 200 : 500).end();
});

export default route;
