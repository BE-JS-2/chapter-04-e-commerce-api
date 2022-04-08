const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const user = await User.findAll({
      attributes: ["id", "username", "password"],
      where: {
        username: req.body.username,
      },
    });
    if (
      user.length === 0 ||
      !user ||
      !bcrypt.compareSync(req.body.password, user[0].password)
    ) {
      throw {
        status: 401,
        message: "Invalid username or password",
      };
    } else {
      const token = jwt.sign(
        { id: user[0].id, username: req.body.username },
        SECRET_KEY
      );
      return res.status(200).json(token);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
