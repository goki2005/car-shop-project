import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart }) {
    const totalPrice = cart.reduce(
        (total, car) => total + Number(car.price),
        0
    );

    return (
        <div className="page">

            <h1 className="title">
                 My Cart
            </h1>

            {cart.length === 0 ? (

                <div className="cart-box">

                    <h2>Your Cart is Empty</h2>

                    <p>
                        Go to Available Cars and add a car.
                    </p>

                    <Link to="/cars">
                        <button>
                            Browse Cars 
                        </button>
                    </Link>

                </div>

            ) : (

                <div className="cart-box">

                    {cart.map((car) => (

                        <div
                            className="cart-item"
                            key={car._id}
                        >

                            <div>
                                <h2>{car.name}</h2>

                                <p>
                                    Brand: {car.brand}
                                </p>

                                <p>
                                    Fuel: {car.fuel}
                                </p>

                                <h3>
                                    ₹{Number(car.price).toLocaleString()}
                                </h3>
                            </div>

                            <button
                                onClick={() =>
                                    removeFromCart(car._id)
                                }
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                    <hr />

                    <h2>
                        Total: ₹{totalPrice.toLocaleString()}
                    </h2>

                    <Link to="/address">
                        <button className="checkout-btn">
                            Proceed to Address 
                        </button>
                    </Link>

                </div>

            )}

        </div>
    );
}

export default Cart;