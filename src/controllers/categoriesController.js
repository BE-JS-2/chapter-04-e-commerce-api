const {categories} = require('../models/')

module.exports = {
    getAllCategories: (req,res) => {
        categories.findAll()
        .then((data) => {
            res.status(200).send({
                message : "Get All Categories Success",
                status: 200,
                data
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Get All Categories is Error",
                status: 500,
                error
            })
        })
    }
}