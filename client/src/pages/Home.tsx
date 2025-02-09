import { Link } from "react-router-dom";
import "./Home.css";
import { useEffect } from "react";

function scrollToElement(el: string) {
    if (el) {
        const target = document.querySelector(el);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }
}

function Home() {
    useEffect(() => {
        setTimeout(() => {
            scrollToElement(location.hash);
        }, 1100);
    }, []);

    return (
        <div className="home">
            <div className="animated-part">
                <h1>Play With Me</h1>
                <div className="short-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                <div className="start-btn-container">
                    <Link className="start-btn play" to="/lobbies">Play</Link>
                    <Link 
                        onClick={() => scrollToElement('#learn_more')} 
                        className="start-btn about" 
                        to="#learn_more"
                    >
                        Learn more
                    </Link>
                </div>
            </div>
            <div className="info" id="learn_more">
                <h3>Play With Me</h3>
                <div className="about">
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt corporis explicabo quisquam iusto esse. Libero voluptate deleniti recusandae consequuntur officiis inventore porro error officia corrupti eveniet, sit architecto minus facilis.</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
