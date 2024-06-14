const Users = require("../models/employeesModel");

//@desc  create an Employee
//@route POST /api/employee/register
const createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;
    console.log(req.body);

    if (!first_name || !last_name || !email || !phone) {
      return res.status(400).json("All field are mendatory !");
    }
    const employeeAvailable = await Users.findOne({ email });
    if (employeeAvailable) {
      return res.status(400).json("Mail is already used !");
    }

    const newUser = new Users({
      first_name,
      last_name,
      email,
      phone,
    });
    await newUser.save();

    if (newUser) {
      return res.status(201).json("Employee has been created");
    } else {
      return res.status(400).json("Employee data is not valid !");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createEmployee,
};
