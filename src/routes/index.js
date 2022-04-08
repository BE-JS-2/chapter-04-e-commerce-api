const mainRoutes = require('express').Router()
const usersRoutes = require('./usersRoutes')
const categoriesRoutes = require('./categoriesRoutes')
const sellersRoutes = require('./sellersRoutes')
const productRoutes = require('./productsRoutes')

//users
mainRoutes.use('/api/users',usersRoutes)

//categories
mainRoutes.use('/api/categories',categoriesRoutes)

//seller
mainRoutes.use('/api/sellers',sellersRoutes)


//product
mainRoutes.use('/api/products',productRoutes)



module.exports=mainRoutes;