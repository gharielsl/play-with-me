import { Link } from "react-router-dom";
import "./Home.css";
import { useEffect, useRef, useState } from "react";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { Engine } from "@tsparticles/engine";

// function Background() {
//     const [init, setInit] = useState(false);

//     useEffect(() => {
//         initParticlesEngine(async (engine) => {
//             loadAll(engine);
//         }).then(() => {
//             setInit(true);
//         });
//     }, []);

//     return init && (
//         <Particles
//             options={{
//                 particles: {
//                     number: { value: 20 },
//                     shape: { type: "circle" },
//                     opacity: { value: 0.5 },
//                     size: { value: { min: 2, max: 10 } },
//                     move: { enable: true, speed: 2, direction: "none", random: true },
//                 },
//             }}
//         />
//     );
// }

function scrollToElement(el: string) {
    if (el) {
        const target = document.querySelector(el);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }
}

function Home() {
    const stepRowRef = useRef<HTMLDivElement>(null);
    const steps = Array.from({ length: 4 }, () => useRef<HTMLDivElement>(null));
    const infoReady = useRef<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(() => {
            if (infoReady.current) {
                steps.forEach(({ current }) => {
                    current?.classList.add("visible");
                });
            }
        });

        if (stepRowRef.current) {
            observer.observe(stepRowRef.current);
        }

        setTimeout(() => {
            infoReady.current = true;
            scrollToElement(location.hash);
        }, 1100);
    }, []);

    return (
        <div className="home">
            {/* <Background /> */}
            <div className="animated-part">
                <h1>Play With Me</h1>
                <div className="short-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                <div className="start-btn-container">
                    <Link className="start-btn play-btn" to="/lobbies">Play</Link>
                    <Link
                        onClick={() => scrollToElement('#learn_more')}
                        className="start-btn about-btn"
                        to="#learn_more"
                    >
                        Learn more
                    </Link>
                </div>
            </div>
            <div className="info" id="learn_more">
                <h2 style={{ color: 'var(--color-primary)' }}>Play With Me</h2>
                <div className="about">
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt corporis explicabo quisquam iusto esse. Libero voluptate deleniti recusandae consequuntur officiis inventore porro error officia corrupti eveniet, sit architecto minus facilis.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt corporis explicabo quisquam iusto esse. Libero voluptate deleniti recusandae consequuntur officiis inventore porro error officia corrupti eveniet, sit architecto minus facilis.
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. A assumenda illum laboriosam minima possimus? Placeat architecto accusamus libero beatae veritatis quas dolores officia neque error, molestiae doloribus labore aliquam aliquid?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ab eum in exercitationem necessitatibus sit libero, accusantium sint facere porro veritatis quidem magni consectetur autem voluptatem corrupti inventore earum aut!
                    </div>
                </div>
                <div className="features">
                    <h2 style={{ color: 'var(--color-secondary)' }}>
                        Let's see how it works
                    </h2>
                    <div ref={stepRowRef} className="step-row">
                        <div className="step-row-half">
                            <div ref={steps[0]} className="step s1">
                                <img src="https://avatars.githubusercontent.com/u/104318152?s=400&u=9b775b3e0aea34bf3585af884a3e3033524e44db&v=4">
                                </img>
                                <div>
                                    <h3>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quae ad doloremque est eaque voluptatum minus veritatis, excepturi minima nihil enim impedit in deserunt dolores tenetur tempore culpa at. Magni?</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quae ad doloremque est eaque voluptatum minus veritatis, excepturi minima nihil enim impedit in deserunt dolores tenetur tempore culpa at. Magni?</p>
                                </div>
                            </div>
                            <div ref={steps[1]} className="step s2">
                                <img src="https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg">
                                </img>
                                <div>
                                    <h3>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quae ad doloremque est eaque voluptatum minus veritatis, excepturi minima nihil enim impedit in deserunt dolores tenetur tempore culpa at. Magni?</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quae ad doloremque est eaque voluptatum minus veritatis, excepturi minima nihil enim impedit in deserunt dolores tenetur tempore culpa at. Magni?</p>
                                </div>
                            </div>
                        </div>
                        <div className="step-row-half">
                            <div ref={steps[2]} className="step s3">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5CqiQQDLVEVd_mEtfKpqF8MTZj0SqiEEWg&s">
                                </img>
                                <div>
                                    <h3>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quae ad doloremque est eaque voluptatum minus veritatis, excepturi minima nihil enim impedit in deserunt dolores tenetur tempore culpa at. Magni?</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quae ad doloremque est eaque voluptatum minus veritatis, excepturi minima nihil enim impedit in deserunt dolores tenetur tempore culpa at. Magni?</p>
                                </div>
                            </div>
                            <div ref={steps[3]} className="step s4">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDCsqRYLAFDdL4Ix_AHai7kNVyoPV9Ssv1xg&s">
                                </img>
                                <div>
                                    <h3>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quae ad doloremque est eaque voluptatum minus veritatis, excepturi minima nihil enim impedit in deserunt dolores tenetur tempore culpa at. Magni?</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quae ad doloremque est eaque voluptatum minus veritatis, excepturi minima nihil enim impedit in deserunt dolores tenetur tempore culpa at. Magni?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
