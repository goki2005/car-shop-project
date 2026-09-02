import { useState } from "react";

function AddCar() {

    const [car, setCar] = useState({
        name: "",
        brand: "",
        price: "",
        fuel: "",
        image: ""
    });

    const handleChange = (e) => {
        setCar({
            ...car,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch("https://car-shop-backend-qxoq.onrender.com/api/cars",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(car)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add car");
            }

            alert("Car added successfully 🚗");

            setCar({
                name: "",
                brand: "",
                price: "",
                fuel: "",
                image: ""
            });

        } catch (error) {
            console.error(error);
            alert("Failed to add car");
        }
    };

    return (
        <div className="add-car-page">

            <div className="add-car-form">

                <h1>Add New Car 🚗</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Car Name"
                        value={car.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={car.brand}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={car.price}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="fuel"
                        value={car.fuel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Fuel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>

                    <input
                        type="text"
                        name="image"
                        placeholder="/cars/imagecar4.jpg"
                        value={car.image}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Add Car 🚗
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddCar;