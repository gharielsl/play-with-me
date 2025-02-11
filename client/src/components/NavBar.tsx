import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const pages = [['Home', '/'], ['Play', '/lobbies']];
const settings = ['Account', 'Logout'];

function NavBar() {
    const [navOpen, setNavOpen] = React.useState(false);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);
    const userMenuRef = React.useRef<HTMLDivElement>(null);
    const location = useLocation();

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as HTMLElement)) {
                setUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="left">
                    <div className="logo">LOGO</div>
                    <button className="menu-button" onClick={() => setNavOpen(!navOpen)}>
                        <i className="bi bi-list"></i>
                    </button>
                    <div className={`nav-links ${navOpen && 'open'}`}>
                        {pages.map(page => (
                            <Link 
                                key={page[0]} 
                                to={page[1]} 
                                onClick={() => setNavOpen(false)} 
                                className={`link ${location.pathname === page[1] ? 'active' : ''}`}
                            >
                                {page[0]}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="user-menu" ref={userMenuRef}>
                    <button className="avatar-button" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                        <div className="avatar"></div>
                    </button>
                    <div className={`dropdown ${userMenuOpen && 'open'}`}>
                        {settings.map(setting => (
                            <div key={setting} className="dropdown-item" onClick={() => setUserMenuOpen(false)}>{setting}</div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;