const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const productsRouter = require("./routes/products");
const registerUserRouter = require("./routes/registerUser");
const ordersRouter = require("./routes/orders");
const transactionsRouter = require("./routes/transactions");

const { errorHandling } = require("./middlewares/errorHandler");
const { authorization } = require("./middlewares/authorization");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/register-user", registerUserRouter);
app.use("/login", loginRouter);
app.use(authorization);
app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/transactions", transactionsRouter);
app.use(errorHandling);

module.exports = app;
