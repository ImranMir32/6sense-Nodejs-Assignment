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
      "first_name last_name isBlock"
    );
    res.status(200).json(EmployeesList);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc  to get a employee details
//@route GET /api/employees/:id
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

//@desc update employee details
//@route PUT /api/employees/:id
const updateEmployeeDetails = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) {
      return res.status(404).json("Employee not found!");
    }

    const { first_name, last_name, email, phone } = req.body;
    console.log(req.body);

    if (!first_name || !last_name || !email || !phone) {
      return res.status(400).json("All field are mendatory !");
    }

    if (email !== employee.email) {
      return res.status(403).json("You can't update employee email");
    }
    const updateEmployee = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      updateEmployee,
      message: "Employee details has been Updated!",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc Block or unblock an employee
//@route PATCH /api/employees/:id
const blockUnblockEmployee = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) {
      return res.status(404).json("Employee not found!");
    }

    let { isBlock } = req.body;
    if (typeof isBlock !== "boolean") {
      isBlock = isBlock === "true";
    }

    employee.isBlock = isBlock;
    await employee.save();

    res
      .status(200)
      .json(`Employee has been ${isBlock ? "blocked" : "unblocked"}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);

    if (!employee) {
      return res.status(404).json("Employee not found!");
    }

    await Employees.deleteOne({ _id: req.params.id });
    res.status(200).json(`Employee with ID ${req.params.id} has been deleted`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createEmployee,
  getEmployeesList,
  getEmployeeDetails,
  updateEmployeeDetails,
  blockUnblockEmployee,
  deleteEmployee,
};
