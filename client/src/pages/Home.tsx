import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home">
            <h1>Play With Me</h1>
            <div className="short-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            <div className="start-btn-container">
                <Link className="start-btn play" to="/lobbies">Play</Link>
                <Link className="start-btn about" to="#learn_more">Learn more</Link>
            </div>
        </div>
    );
}

export default Home;
