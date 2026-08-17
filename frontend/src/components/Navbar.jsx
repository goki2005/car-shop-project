import { Link } from "react-router-dom";

function Navbar({ cartCount }) {

    return (
        <nav className="navbar">

            <h2>CAR SHOPPING</h2>

            <div className="nav-links">

                <Link to="/home">
                    Home
                </Link>

                <Link to="/cars">
                    Available Cars
                </Link>

                <Link to="/cart">
                     Cart
                </Link>

                <Link to="/address">
                    Address
                </Link>

                {/* <Link to="/add-car">
                    Add to Car
                </Link> */}

                <Link to="/contact">
                    Contact
                </Link>

                <Link to="/admin-login">
                    Admin
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;