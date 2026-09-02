import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart }) {

    const totalPrice = cart.reduce(
        (total, car) => total + Number(car.price || 0),
        0
    );

    return (
        <div className="page">

            <h1 className="title">
                Shopping Cart 🛒
            </h1>

            {cart.length === 0 ? (

                <div className="cart-box">
                    <h2>Your cart is empty</h2>
                    <p>Add some cars to your cart.</p>
                </div>

            ) : (

                <div className="cart-box">

                    <h2>Selected Cars</h2>

                    <p>
                        Total Cars: {cart.length}
                    </p>

                    {cart.map((car) => {

                        const imageUrl = car.image
                            ? car.image.startsWith("http")
                                ? car.image
                                : `${import.meta.env.BASE_URL}${car.image.replace(/^\/+/, "")}`
                            : `${import.meta.env.BASE_URL}cars/imagecar1.jpg`;

                        return (
                            <div
                                className="cart-item"
                                key={car._id}
                            >

                                <div className="cart-image-box">
                                    <img
                                        src={imageUrl}
                                        alt={car.name}
                                        className="cart-car-image"
                                    />
                                </div>

                                <div className="cart-car-info">

                                    <h2>{car.name}</h2>

                                    <p>
                                        <strong>Brand:</strong>{" "}
                                        {car.brand}
                                    </p>

                                    <p>
                                        <strong>Fuel:</strong>{" "}
                                        {car.fuel}
                                    </p>

                                    <h3>
                                        ₹{Number(car.price || 0).toLocaleString("en-IN")}
                                    </h3>

                                </div>

                                <button
                                    onClick={() => removeFromCart(car._id)}
                                >
                                    Remove
                                </button>

                            </div>
                        );
                    })}

                    <hr />

                    <h2>
                        Total Price: ₹{totalPrice.toLocaleString("en-IN")}
                    </h2>

                    <Link
                        to="/address"
                        className="checkout-btn"
                    >
                        Checkout 💳
                    </Link>

                </div>
            )}

        </div>
    );
}

export default Cart;
