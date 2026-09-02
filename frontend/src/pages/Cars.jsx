import { useEffect, useState } from "react";

function Cars({ addToCart }) {

    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch("https://car-shop-backend-qxoq.onrender.com/api/cars")
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch cars");
                }

                return response.json();
            })
            .then((data) => {

                console.log("Cars from Render:", data);

                if (Array.isArray(data)) {
                    setCars(data);
                } else {
                    setCars([]);
                    setError("Invalid car data received");
                }

                setLoading(false);
            })
            .catch((err) => {

                console.error("Cars Error:", err);

                setError(err.message);
                setLoading(false);
            });

    }, []);

    const filteredCars = cars.filter((car) => {

        const carName = String(car.name || "").toLowerCase();
        const carBrand = String(car.brand || "").toLowerCase();
        const searchText = search.toLowerCase();

        return (
            carName.includes(searchText) ||
            carBrand.includes(searchText)
        );
    });

    if (loading) {
        return (
            <div className="cars-page">
                <h1>Available Cars 🚗</h1>
                <p>Loading cars...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cars-page">
                <h1>Available Cars 🚗</h1>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="cars-page">

            <h1>Available Cars 🚗</h1>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by car name or brand..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredCars.length === 0 ? (

                <p className="no-result">
                    No cars found
                </p>

            ) : (

                <div className="cars-container">

                    {filteredCars.map((car) => {

                        const imageUrl = car.image
                            ? car.image.startsWith("http")
                                ? car.image
                                : `${import.meta.env.BASE_URL}${car.image.replace(/^\/+/, "")}`
                            : "";

                        return (
                            <div
                                className="car-card"
                                key={car._id}
                            >

                                <div className="car-image-box">
                                    <img
                                     src={`${import.meta.env.BASE_URL}${car.image.replace(/^\/+/, "")}`}
                                     alt={car.name}
                                     className="car-image"
                                    />


                                </div>

                                <div className="car-info">

                                    <h2>{car.name}</h2>

                                    <p>
                                        <strong>Brand:</strong>{" "}
                                        {car.brand}
                                    </p>

                                    <p>
                                        <strong>Fuel:</strong>{" "}
                                        {car.fuel}
                                    </p>

                                    <p>
                                        <strong>Price:</strong>{" "}
                                        ₹{Number(car.price || 0).toLocaleString("en-IN")}
                                    </p>

                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(car)}
                                    >
                                        Add to Cart 🛒
                                    </button>

                                </div>

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}

export default Cars;