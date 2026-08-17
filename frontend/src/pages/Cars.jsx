import { useEffect, useState } from "react";

function Cars({ addToCart }) {

    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");

    // Get cars from backend
    useEffect(() => {

        fetch("http://localhost:5001/api/cars")
            .then((response) => response.json())
            .then((data) => {
                setCars(data);
            })
            .catch((error) => {
                console.log("Error fetching cars:", error);
            });

    }, []);

    // Search cars
    const filteredCars = cars.filter(
        (car) =>
            car.name.toLowerCase().includes(search.toLowerCase()) ||
            car.brand.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page">

            {/* Page Title */}
            <h1 className="title">
                Available Cars
            </h1>

            {/* Search Box */}
            <div className="search-box">

                <input
                    type="text"
                    placeholder="Search car or brand..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {/* Cars */}
            <div className="car-container">

                {filteredCars.map((car) => {

                    const imagePath = car.image?.startsWith("/")
                        ? car.image
                        : `/cars/${car.image}`;

                    return (

                        <div
                            className="car-card"
                            key={car._id}
                        >

                            {/* LEFT SIDE */}
                            <div className="car-info">

                                <h2>
                                    {car.name}
                                </h2>

                                <p>
                                    <strong>Brand:</strong>{" "}
                                    {car.brand}
                                </p>

                                <h3>
                                    ₹
                                    {Number(car.price).toLocaleString(
                                        "en-IN"
                                    )}
                                </h3>

                                <p>
                                    <strong>Fuel:</strong>{" "}
                                    {car.fuel}
                                </p>

                                <button
                                    onClick={() => addToCart(car)}
                                >
                                    Add to Cart
                                </button>

                            </div>

                            {/* RIGHT SIDE IMAGE */}
                            <div className="car-image-box">

                                <img
                                    src={imagePath}
                                    alt={car.name}
                                    className="car-image"
                                />

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* No Cars */}
            {filteredCars.length === 0 && (

                <p className="no-result">
                    No cars found
                </p>

            )}

        </div>
    );
}

export default Cars;