const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployeesList,
  getEmployeeDetails,
} = require("../controllers/employeeController");

router.post("/register", createEmployee);

router.get("/", getEmployeesList);
router.get("/:id", getEmployeeDetails);

module.exports = router;
