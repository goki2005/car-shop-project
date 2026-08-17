import { useState } from "react";

function AddCar() {

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        price: "",
        fuel: "",
        image: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5001/api/cars",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...formData,
                        price: Number(formData.price)
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("Car added successfully ");

                setFormData({
                    name: "",
                    brand: "",
                    price: "",
                    fuel: "",
                    image: ""
                });

            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="add-car-page">

            <div className="add-car-form">

                <h1>Add New Car </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Car Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Car Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="fuel"
                        value={formData.fuel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Fuel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>

                    <button type="submit">
                        Add Car
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddCar;