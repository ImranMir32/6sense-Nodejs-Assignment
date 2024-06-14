const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployeesList,
} = require("../controllers/employeeController");

router.post("/register", createEmployee);

router.get("/", getEmployeesList);

module.exports = router;
