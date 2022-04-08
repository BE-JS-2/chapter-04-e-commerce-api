const express = require('express')
const app = express()
const port = 3000
const mainRoutes = require('./src/routes/');
const errorHandler = require('./src/middleware/errorHanlder')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',mainRoutes)


app.use(errorHandler)
app.listen(port, () => {
    console.log(`server runing ${port}`);
})