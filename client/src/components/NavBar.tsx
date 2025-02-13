import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import './NavBar.css';
import { useUser } from '../context/UserContext';
import urlJoin from 'url-join';

function NavBar() {
    const [navOpen, setNavOpen] = React.useState(false);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);
    const userMenuRef = React.useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUser();

    let pages = [['Home', '/'], ['Play', '/lobbies']];

    if (location.pathname === '/profile') {
        pages.push(['Profile', '/profile']);
    }

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

    function logInOut() {
        if (user?.isGuest) {
            navigate('/login');
        } else {
            Cookie.remove('accessToken');
            window.location.href = urlJoin(import.meta.env.VITE_API_ROOT, '/auth/logout');
        }
    }

    function profile() {
        setUserMenuOpen(false);
        navigate('/profile');
    }

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
                        <div className="avatar">
                            {
                                user?.profileImg ? 
                                    <img src={user?.profileImg} alt="profile"></img> : 
                                    <i className="bi bi-person-fill" style={{ }}></i>
                            }
                        </div>
                    </button>
                    <div className={`dropdown ${userMenuOpen && 'open'}`}>
                        <div className="dropdown-item" onClick={profile}>{user?.displayName}</div>
                        <div className="dropdown-item" onClick={logInOut}>{user?.isGuest ? 'Log in' : 'Log out'}</div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;