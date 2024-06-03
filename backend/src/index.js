const express = require("express");
const cors = require("cors");
const path = require("path");


const UserRoutes = require("./routes/UserRoutes");
const PetRoutes = require("./routes/PetRoutes");

const app = express();

// Config JSON response
app.use(express.json());

// Solve Cors
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Public folder for images
app.use(express.static("src/public"));

// Routes
app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);

// Server
app.listen(5000);
