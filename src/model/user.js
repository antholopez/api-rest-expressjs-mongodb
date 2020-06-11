const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isVerified: { type: Boolean, default: true },
    birthdate: Date,
    token: String,
  },
  { timestamps: true }
);

userSchema.method({
  generateHash: async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
});

module.exports = model("users", userSchema);
