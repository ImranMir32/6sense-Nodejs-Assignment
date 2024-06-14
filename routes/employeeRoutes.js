const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployeesList,
  getEmployeeDetails,
  updateEmployeeDetails,
  blockUnblockEmployee,
} = require("../controllers/employeeController");

router.post("/register", createEmployee);

router.get("/", getEmployeesList);
router.get("/:id", getEmployeeDetails);
router.put("/:id", updateEmployeeDetails);
router.patch("/:id", blockUnblockEmployee);

module.exports = router;
