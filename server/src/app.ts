import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import ws from 'ws';
import lobby from './routes/lobby';
import user from './routes/user';
import { route as auth } from './routes/auth';
import userMiddleware from './middleware/user-middleware';
import { connect } from './query/connection';

async function setup() {
    await connect();

    const app = express();

    app.use(cors());

    app.use(session({
        secret: process.env.SESSION_SECRET as string
    }));

    app.use('/auth', auth);
    app.use(userMiddleware);
    app.use('/api/v1/lobby', lobby);
    app.use('/api/v1/user', user);

    const server = app.listen(process.env.APP_PORT);

    const wss = new ws.Server({ server });
}

setup();
