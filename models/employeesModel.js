const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please add the first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please add the last name"],
    },
    email: {
      type: String,
      required: [true, "Please add the employee email address"],
      unique: [true, "Email address already taken"],
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number"],
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", usersSchema);
