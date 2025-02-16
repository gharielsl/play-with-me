import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import urljoin from 'url-join';
import Cookie from 'js-cookie';

interface UserContextType {
    user: PlayWithMeUser | null;
    login: (userData: PlayWithMeUser) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<PlayWithMeUser | null>(null);

    useEffect(() => {
        fetch(urljoin(import.meta.env.VITE_API_ROOT, '/api/v1/user/info'), {
            headers: {
                Authorization: Cookie.get('accessToken') || ''
            }
        }).then(async (resp) => {
            const user = await resp.json();
            console.log(user);
            setUser(user);
        });
    }, []);

    const login = (userData: PlayWithMeUser) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
