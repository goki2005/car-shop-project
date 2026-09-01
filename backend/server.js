const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// CAR MODEL
// =======================

const carSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    fuel: String,
    image: String
});

const Car = mongoose.model("Car", carSchema);

// =======================
// HOME
// =======================

app.get("/", (req, res) => {
    res.send("Car Shop Backend Running 🚗");
});

// =======================
// GET CARS
// =======================
app.get("/api/cars", async (req, res) => {
    try {
        const cars = [
            {
                _id: "1",
                name: "Creta",
                brand: "Hyundai",
                price: 1500000,
                fuel: "Petrol",
                image: "/imagecar.jpg"
            },
            {
                _id: "2",
                name: "Swift",
                brand: "Maruti",
                price: 800000,
                fuel: "Petrol",
                image: "/imagecar.jpg"
            },
            {
                _id: "3",
                name: "Nexon",
                brand: "Tata",
                price: 1000000,
                fuel: "Diesel",
                image: "/imagecar.jpg"
            }
        ];

        res.json(cars);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch cars",
            error: error.message
        });
    }
});

// =======================
// ADD CAR
// =======================

app.post("/api/cars", async (req, res) => {
    try {

        const car = new Car(req.body);

        const savedCar = await car.save();

        res.status(201).json(savedCar);

    } catch (error) {

        console.log("ADD ERROR:", error);

        res.status(500).json({
            message: "Failed to add car",
            error: error.message
        });
    }
});

// =======================
// MONGODB
// =======================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully 🚗");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });

// =======================
// SERVER
// =======================

const PORT = process.env.PORT || 5000;
app.get("/api/seed-cars", async (req, res) => {
    try {

        const existingCars = await Car.countDocuments();

        if (existingCars > 0) {
            return res.json({
                message: "Cars already exist",
                count: existingCars
            });
        }

        const cars = [
            {
                name: "Creta",
                brand: "Hyundai",
                price: 1500000,
                fuel: "Petrol",
                image: "/imagecar.jpg"
            },
            {
                name: "Swift",
                brand: "Maruti",
                price: 800000,
                fuel: "Petrol",
                image: "/imagecar.jpg"
            },
            {
                name: "Nexon",
                brand: "Tata",
                price: 1000000,
                fuel: "Diesel",
                image: "/imagecar.jpg"
            }
        ];

        const result = await Car.insertMany(cars);

        res.json({
            message: "Cars added successfully 🚗",
            count: result.length,
            cars: result
        });

    } catch (error) {

        console.log("SEED ERROR:", error);

        res.status(500).json({
            message: "Failed to add cars",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});