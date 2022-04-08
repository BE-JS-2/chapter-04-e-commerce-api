const { User } = require("../models");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
  try {
    const hassedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      name: req.body.name,
      password: hassedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!user) {
      throw {
        status: 404,
        message: "Failed register user",
      };
    } else {
      return res.status(200).json({ message: "Success register user" });
    }
  } catch (error) {
    next(error);
  }
};

const isDuplicateUsername = async (usernameParams) => {
  const count = await User.findOne({ where: { username: usernameParams } });
  if (count != null) {
    return true;
  }
  return false;
};

module.exports = { registerUser, isDuplicateUsername };
