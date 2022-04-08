const {users} = require('../models/')

module.exports = {
    getAllUsers : (req,res) => {
        users.findAll()

        .then((data) => {
            res.status(200).send({
                message : "Get All Users Success",
                status : 200,
                data
            })
        })
        .catch((error) => {
            res.status(500).send({
                message : "Get All Users is Error",
                status: 500,
                error
            })
        })
    },
}