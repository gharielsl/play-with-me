import redditSvg from '../assets/reddit.svg';
import googleSvg from '../assets/google.svg';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import urlJoin from 'url-join';

export default function Login() {
    const navigate = useNavigate();

    function login(provider: string) {
        location.href = urlJoin(import.meta.env.VITE_API_ROOT, '/auth/login?provider=' + provider);
    }

    return (
        <div className="login-page">
            <div className="providers">
                <h2>Sign In</h2>
                <div onClick={() => login('google')} className="provider google">
                    <img src={googleSvg}></img>
                    <div>Continue with Google</div>
                </div>
                <div onClick={() => login('reddit')} className="provider reddit">
                    <img src={redditSvg}></img>
                    <div>Continue with Reddit</div>
                </div>
                <div className="divider">
                    <div className="side"></div>
                    <div className="center">Cancel</div>
                    <div className="side"></div>
                </div>
                <div onClick={() => navigate(-1)} className="provider cancel">
                    <div>Continue as guest</div>
                </div>
            </div>
            <div className="right">

            </div>
        </div>
    );
}
