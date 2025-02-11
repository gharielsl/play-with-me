import express from 'express';
import { generate } from 'random-words';
import { sessions } from '../routes/auth';

const middleware = express();

middleware.use((req, res, next) => {
    if (req.user) {
        next();
        return;
    }
    if (req.headers.authorization) {
        if (sessions[req.headers.authorization]) {
            req.user = sessions[req.headers.authorization] as any;
        } else {
            const displayName = generate(1)[0] + generate(1)[0] + Math.floor(Math.random() * 100);
            req.user = {
                id: 'guest_' + displayName,
                isGuest: true,
                displayName: displayName,
                email: displayName + '@guest',
                profileImg: `https://robohash.org/${displayName}.png`
            } as any;
            sessions[req.headers.authorization] = req.user;
        }
        next();
        return;
    }
    res.status(401).end();
});

export default middleware;
