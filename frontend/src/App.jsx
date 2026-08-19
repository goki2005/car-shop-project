import { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import "./style.css";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import AddCar from "./pages/AddCar";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

function App() {

    const [cart, setCart] = useState([]);

    const addToCart = (car) => {
        setCart([...cart, car]);
        alert(`${car.name} added to cart`);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((car) => car._id !== id));
    };

    return (
        <HashRouter basename="/car-shop-project">

            <Navbar cartCount={cart.length} />

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/home" replace />}
                />

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/cars"
                    element={
                        <Cars
                            addToCart={addToCart}
                        />
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            removeFromCart={removeFromCart}
                        />
                    }
                />

                <Route
                    path="/address"
                    element={<Address />}
                />

                <Route
                    path="/add-car"
                    element={<AddCar />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin"
                    element={<Admin />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/home" replace />}
                />

            </Routes>

        </HashRouter>
    );
}

export default App;