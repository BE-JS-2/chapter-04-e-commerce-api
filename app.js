const express = require('express');
const errorHandler = require("./middlewares/errorHandler");
const productsRouter = require("./routes/products");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productsRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});