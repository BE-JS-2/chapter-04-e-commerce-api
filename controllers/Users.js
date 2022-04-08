const { Users } = require("../models");
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async(req, res, next) => {
    const { name, password } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed ,entered data is incorrect");
            error.statusCode = 422;
            throw error;
        }
        const user = await Users.create({
            name: name,
            password: password
        });
        res.status(201).json({
            message: "User created successfully",
            user: user
        });
    } catch (error) {
        next(error);
    }
}

exports.postLogin = async(req, res, next) => {
    const { name, password } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed ,entered data is incorrect");
            error.statusCode = 422;
            throw error;
        }
        const user = await Users.findOne({
            where: {
                name: name
            }
        });
        if (!user) {
            const error = new Error("Could not find user");
            error.statusCode = 404;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Wrong password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
                name: user.name,
                userId: user.id,
            },
            process.env.JWT_SECRET, { expiresIn: "1hr" });
        res.status(200).json({
            message: "User logged in successfully",
            token: token,
            userId: user.id
        });
    } catch (error) {
        next(error);
    }
}