import { Express } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
    interface User {
        id: string;
        displayName: string;
        name: {
            familyName: string;
            givenName: string;
        };
        emails: {
            value: string;
            verified: boolean;
        }[];
        photos: {
            value: string;
        }[];
        provider: string;
        playWithMeUser: PlayWithMeUser;
    }

    interface Request {
        user: User;
    }
};
