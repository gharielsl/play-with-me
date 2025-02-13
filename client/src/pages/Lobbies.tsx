import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import './Lobbies.css';
import urlJoin from 'url-join';
import { useUser } from '../context/UserContext';

function Lobbies() {
    const placeholderLobbies = Array(4).fill(null);
    const [userLobbies, setUserLobbies] = useState<Lobby[]>(placeholderLobbies);
    const [lobbies, setLobbies] = useState<Lobby[]>(placeholderLobbies);
    const { user } = useUser();

    useEffect(() => {
        if (user && !user.isGuest) {
            fetch(urlJoin(import.meta.env.VITE_API_ROOT, `/api/v1/user/${user?.id}/lobbies`), {
                headers: {
                    Authorization: Cookie.get('accessToken') || ''
                }
            }).then(async (resp) => {
                // setUserLobbies(await resp.json());
            });
        } else {
            // setUserLobbies([]);
        }
        fetch(urlJoin(import.meta.env.VITE_API_ROOT, '/api/v1/lobby'), {
            headers: {
                Authorization: Cookie.get('accessToken') || ''
            }
        }).then(async (resp) => {
            // setLobbies(await resp.json());
        });
    }, [user]);

    return (
        <div className="lobbies-container">
            <div className="top-bar">
                <button className="create-btn">Create</button>
                <div className="search-bar-container">
                    <input type="text" className="search-bar" placeholder="Search..." />
                    <i className="bi bi-search search"></i>
                </div>
            </div>

            <h1 className="title">Your lobbies</h1>
            <div className="lobby-grid">
                {userLobbies.length > 0 ? (
                    userLobbies.map((lobby, i) => (
                        <LobbyCard key={i} index={i} creator="You" />
                    ))
                ) : (
                    <div>You don't have any lobbies, <a>create a lobby.</a></div>
                )}
            </div>

            <h1 className="title">Popular</h1>
            <div className="lobby-grid">
                {lobbies.length > 0 ? (
                    lobbies.map((lobby, i) => (
                        <LobbyCard key={i} index={userLobbies.length + i} creator="You" />
                    ))
                ) : (
                    <div>No lobbies exist, that's odd.</div>
                )}
            </div>
        </div>
    );
}

function LobbyCard({ creator, index }: { creator: string, index: number }) {
    return (
        <div className="lobby-card">
            <img src={'https://picsum.photos/512?r=' + index} alt="Lobby" className="lobby-image" />
            <div className="lobby-info">
                <h2 className="lobby-title">Lobby Name</h2>
                <div className="lobby-meta">
                    <span className="players">12/30 online</span>
                    <span className="creator">{creator}</span>
                </div>
                <div className="lobby-actions-container">
                    <button className="lobby-play-btn">Play</button>
                    <div className="lobby-actions">
                        <i className="bi bi-pencil-fill lobby-edit-btn"></i>
                        <i className="bi bi-trash-fill lobby-delete-btn"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lobbies;
