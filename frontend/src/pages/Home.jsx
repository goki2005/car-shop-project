import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            <div className="home-content">
                <h1>
                    FIND YOUR
                    <br />
                    <span>DREAM CAR</span>
                </h1>

                <p>
                    Explore the best cars from top brands.
                    <br />
                    Best prices, best service, best experience.
                </p>

                <div className="home-buttons">
                    <Link to="/cars">
                        <button className="view-btn">
                            VIEW AVAILABLE CARS →
                        </button>
                    </Link>

                    <Link to="/contact">
                        <button className="contact-btn">
                            CONTACT US →
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default Home;