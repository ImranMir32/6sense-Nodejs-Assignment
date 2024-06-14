const Employees = require("../models/employeesModel");

//@desc  create an Employee
//@route POST /api/employees/register
const createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;
    console.log(req.body);

    if (!first_name || !last_name || !email || !phone) {
      return res.status(400).json("All field are mendatory !");
    }
    const employeeAvailable = await Employees.findOne({ email });
    if (employeeAvailable) {
      return res.status(400).json("Mail is already used !");
    }

    const newEmployee = new Employees({
      first_name,
      last_name,
      email,
      phone,
    });
    await newEmployee.save();

    if (newEmployee) {
      return res.status(201).json("Employee has been created");
    } else {
      return res.status(400).json("Employee data is not valid !");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc  to get all employees list
//@route GET /api/employees/
const getEmployeesList = async (req, res) => {
  try {
    const EmployeesList = await Employees.find({}).select(
      "first_name last_name isBlocked"
    );
    res.status(200).json(EmployeesList);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getEmployeeDetails = async (req, res) => {
  try {
    const EmployeeDetails = await Employees.findById(req.params.id);
    if (!EmployeeDetails) {
      return res.status(404).json({ massgae: "Employee not found" });
    }
    res.status(200).json(EmployeeDetails);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createEmployee,
  getEmployeesList,
  getEmployeeDetails,
};
