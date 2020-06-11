const moment = require("moment");

const User = require("../model/user");

const getUsers = async (req, res) => {
  const users = await User.find();

  const response = users.map((user) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthdate: formatBirthdate(user.birthdate),
    isVerified: user.isVerified,
  }));

  res.status(200).json(response);
};

const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password, birthdate } = req.body;

  let newUser = new User({
    firstName,
    lastName,
    email,
    birthdate,
  });
  newUser.password = await newUser.generateHash(password);

  await newUser.save();

  res.status(201).json(newUser);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  const response = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthdate: formatBirthdate(user.birthdate),
    password: user.password,
    isVerified: user.isVerified,
  };

  res.status(200).json(response);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(201).json({ message: "User has been successfully edited." })
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findOneAndDelete({ _id: id });
  res.status(201).json({ message: "User has been successfully removed." });
};

const formatBirthdate = (date) => {
  return moment(date).add(5, "hours").format("DD/MM/YYYY");
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser
};
