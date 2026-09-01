const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// MongoDB Atlas Connection
// ===============================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully 🚗");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });

// ===============================
// Car Schema
// ===============================

const carSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        fuel: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Car = mongoose.model("Car", carSchema);

// ===============================
// Enquiry Schema
// ===============================

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true
        },

        carName: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
    res.send("Car Shop Backend Running 🚗");
});

// ===============================
// GET ALL CARS
// ===============================

app.get("/api/cars", async (req, res) => {
    try {
        const cars = await Car.find();

        res.status(200).json(cars);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch cars"
        });
    }
});

// ===============================
// GET SINGLE CAR
// ===============================

app.get("/api/cars/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        res.status(200).json(car);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch car"
        });
    }
});

// ===============================
// ADD NEW CAR
// ===============================

app.post("/api/cars", async (req, res) => {
    try {
        const { name, brand, price, fuel, image } = req.body;

        const newCar = new Car({
            name,
            brand,
            price,
            fuel,
            image
        });

        const savedCar = await newCar.save();

        res.status(201).json({
            message: "Car added successfully 🚗",
            car: savedCar
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to add car"
        });
    }
});

// ===============================
// DELETE CAR
// ===============================

app.delete("/api/cars/:id", async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);

        if (!deletedCar) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        res.status(200).json({
            message: "Car deleted successfully 🚗"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to delete car"
        });
    }
});

// ===============================
// UPDATE CAR
// ===============================

app.put("/api/cars/:id", async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCar) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        res.status(200).json({
            message: "Car updated successfully 🚗",
            car: updatedCar
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update car"
        });
    }
});

// ===============================
// ADD ENQUIRY
// ===============================

app.post("/api/enquiries", async (req, res) => {
    try {
        const { name, email, phone, message, carName } = req.body;

        const newEnquiry = new Enquiry({
            name,
            email,
            phone,
            message,
            carName
        });

        const savedEnquiry = await newEnquiry.save();

        res.status(201).json({
            message: "Enquiry submitted successfully 👍",
            enquiry: savedEnquiry
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to submit enquiry"
        });
    }
});

// ===============================
// GET ALL ENQUIRIES
// ===============================

app.get("/api/enquiries", async (req, res) => {
    try {
        const enquiries = await Enquiry.find();

        res.status(200).json(enquiries);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch enquiries"
        });
    }
});

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});