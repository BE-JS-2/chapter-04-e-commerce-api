const router = require('express').Router();
const { body } = require('express-validator');
const Users = require("../controllers/Users");

router.put("/register-user", [
    body("name").not().isEmpty().withMessage("Name is required").trim(),
    body("password").not().isEmpty().withMessage("Password is required").trim(),
], Users.registerUser);

router.post("/login", Users.postLogin);

module.exports = router;