const mongoose = require("mongoose");

//UserSChemas
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    profilePic: {
      type: String,
      default: " ",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
