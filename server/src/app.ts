import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import ws from 'ws';
import lobby from './routes/lobby';
import auth from './routes/auth';

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET as string
}));

app.use('/api/v1/lobby', lobby);
app.use('/auth', auth);
app.get('/test', (req, res) => {
    res.send('ok')
})

const server = app.listen(process.env.APP_PORT);

const wss = new ws.Server({ server });
