import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import urljoin from 'url-join';
import * as uuid from 'uuid';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const newToken = urlParams.get('accessToken');

    if (newToken) {
        Cookie.set('accessToken', newToken);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete('accessToken');
        window.history.replaceState(
            null,
            '',
            `${window.location.pathname}?${urlParams.toString()}`
        );
        return;
    }

    const resp = await fetch(urljoin(import.meta.env.VITE_API_ROOT, '/api/v1/user/info'), {
        headers: {
            Authorization: Cookie.get('accessToken') || ''
        }
    });

    if (resp.status === 401 || resp.status === 404) {
        Cookie.set('accessToken', uuid.v4());
    }
}

init().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    );
});
