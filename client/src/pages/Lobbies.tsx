import './Lobbies.css';

function Lobbies() {
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
                {Array(4).fill(0).map((_, i) => (
                    <LobbyCard key={i} creator="You" />
                ))}
            </div>

            <h1 className="title">Popular</h1>
            <div className="lobby-grid">
                {Array(4).fill(0).map((_, i) => (
                    <LobbyCard key={i} creator="OtherUser" />
                ))}
            </div>
        </div>
    );
}

function LobbyCard({ creator }: { creator: string }) {
    return (
        <div className="lobby-card">
            <img src="https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg" alt="Lobby" className="lobby-image" />
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
