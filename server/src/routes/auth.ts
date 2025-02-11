import express from 'express';
import passport from 'passport';
import uuid from 'uuid';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createOrUpdateUser, getUserById } from '../query/user';

const route = express();

const sessions: { [token: string]: Express.User } = { };

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_REDIRECT_URI,
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser(async (user: any, done) => {
    let playWithMeUser: PlayWithMeUser | null = await getUserById(user.id);
    if (!playWithMeUser) {
        playWithMeUser = {
            id: user.id,
            displayName: user.displayName,
            isGuest: false,
            email: user.emails[0]?.value,
            profileImg: user.photos[0]?.value
        };
        await createOrUpdateUser(playWithMeUser);
    }
    user.playWithMeUser = playWithMeUser;
    user.accessToken = uuid.v4();
    sessions[user.accessToken] = user;
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user as PlayWithMeUser);
});

route.use(passport.initialize());
route.use(passport.session());

route.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

route.get('/logout', (req, res) => {
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

route.get(
    '/login/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
        res.redirect(process.env.CLIENT_ROOT + '?accessToken=' + req.user.accessToken);
    }
);

export {
    route,
    sessions
};
