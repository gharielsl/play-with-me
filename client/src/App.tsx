import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import NavBar from './components/NavBar';
import Lobbies from './pages/Lobbies';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
    const location = useLocation();

    return (
        <UserProvider>
            {
                location.pathname !== '/' && location.pathname !== '/login' && <NavBar />
            }
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/lobbies' element={<Lobbies />} />
                <Route path='/play/:lobby' element={<Play />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </UserProvider>
    );
}

export default App
