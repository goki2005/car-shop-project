const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// =======================
// CORS
// =======================

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

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
// ADD CAR
// =======================

app.post("/api/cars", async (req, res) => {
    try {
        const car = new Car({
            name: req.body.name,
            brand: req.body.brand,
            price: Number(req.body.price),
            fuel: req.body.fuel,
            image: req.body.image
        });

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
// GET ALL CARS
// =======================

app.get("/api/cars", async (req, res) => {
    try {
        const cars = await Car.find({});

        res.status(200).json(cars);

    } catch (error) {
        console.log("FETCH CARS ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch cars",
            error: error.message
        });
    }
});

// =======================
// SEED CARS
// =======================

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
                image: "/cars/imagecar1.jpg"
            },
            {
                name: "Swift",
                brand: "Maruti",
                price: 800000,
                fuel: "Petrol",
                image: "/cars/imagecar2.jpg"
            },
            {
                name: "Nexon",
                brand: "Tata",
                price: 1000000,
                fuel: "Diesel",
                image: "/cars/imagecar3.jpg"
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

// =======================
// MONGODB + SERVER
// =======================

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully 🚗");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT} 🚀`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });