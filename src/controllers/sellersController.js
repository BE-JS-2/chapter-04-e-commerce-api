const {sellers} = require('../models')


module.exports = {
    getAllSeller : (req,res) => {
        sellers.findAll()

        .then((data) => {
            res.status(200).send({
                message : "Get All Sellers Success",
                status : 200,
                data
            })
        })
        .catch((error) => {
            res.status(500).send({
                message : "Get All Sellers is Error",
                status: 500,
                error
            })
        })
    },
}