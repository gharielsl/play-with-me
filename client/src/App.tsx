import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/play/:lobby' element={<Play />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
