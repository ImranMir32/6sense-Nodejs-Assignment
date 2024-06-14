const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployeesList,
  getEmployeeDetails,
  updateEmployeeDetails,
} = require("../controllers/employeeController");

router.post("/register", createEmployee);

router.get("/", getEmployeesList);
router.get("/:id", getEmployeeDetails);
router.put("/:id", updateEmployeeDetails);

module.exports = router;
