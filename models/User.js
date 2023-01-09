const mongoose = require("mongoose");

const User = new mongoose.Schema({
  phone: {
    type: String,
    index: { unique: true },
    required: [true, "phone number required"],
    validate: {
      validator: function (value) {
        return /^\+\d{12}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid number`,
    },
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: [6, "Minimum length is 6 symbols"],
  },
  roles: [{ type: String, ref: "Roles" }],
});

module.exports = mongoose.model("User", User);
