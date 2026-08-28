import { useEffect, useState } from "react";

function Cars({ addToCart }) {
    const [search, setSearch] = useState("");

    const [cars, setCars] = useState([
    {
        _id: "1",
        name: "Creta",
        brand: "Hyundai",
        price: 1500000,
        fuel: "Petrol",
        image: "imagecar.jpg"
    },
    {
        _id: "2",
        name: "Swift",
        brand: "Maruti",
        price: 800000,
        fuel: "Petrol",
        image: "imagecar.jpg"
    },
    {
        _id: "3",
        name: "Nexon",
        brand: "Tata",
        price: 1000000,
        fuel: "Diesel",
        image: "imagecar.jpg"
    }
]);
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

                    const imagePath = `${import.meta.env.BASE_URL}${car.image.replace(/^\/+/, "")}`;
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