require("./config/db");
const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/employees", employeeRoutes);

module.exports = app;
