import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import NavBar from './components/Navbar';
import Lobbies from './pages/Lobbies';

function App() {
    const location = useLocation();

    return (
        <>
            {
                location.pathname !== '/' && <NavBar />
            }
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/lobbies' element={<Lobbies />} />
                <Route path='/play/:lobby' element={<Play />} />
            </Routes>
        </>
    );
}

export default App
