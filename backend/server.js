const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/car_shop")
    .then(() => {
        console.log("MongoDB Connected Successfully ");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error");
        console.log(error);
    });


const Car = require("./models/Car");
const Enquiry = require("./models/Enquiry");

app.get("/api/cars", async (req, res) => {
    try {
        const cars = await Car.find();

        res.json(cars);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching cars",
            error: error.message
        });
    }
});

app.post("/api/cars", async (req, res) => {
    try {
        const car = new Car(req.body);

        const savedCar = await car.save();

        res.status(201).json(savedCar);
    } catch (error) {
        res.status(500).json({
            message: "Error adding car",
            error: error.message
        });
    }
});

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

        res.json({
            message: "Car updated successfully",
            car: updatedCar
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating car",
            error: error.message
        });
    }
});

app.delete("/api/cars/:id", async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(
            req.params.id
        );

        if (!deletedCar) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        res.json({
            message: "Car deleted successfully",
            car: deletedCar
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting car",
            error: error.message
        });
    }
});

app.post("/api/enquiries", async (req, res) => {
    try {
        const enquiry = new Enquiry(req.body);

        const savedEnquiry = await enquiry.save();

        res.status(201).json({
            message: "Enquiry submitted successfully",
            enquiry: savedEnquiry
        });

    } catch (error) {
        res.status(500).json({
            message: "Error submitting enquiry",
            error: error.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("Car Shop Backend Running ");
});

app.listen(5001, () => {
    console.log(`Server running on http://localhost:5001`);
});
