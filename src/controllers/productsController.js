const {products,categories,sellers} =  require('../models')
const {validationResult } = require('express-validator');

module.exports ={
    getAllProducts:async (req,res,next) => {
        try {
            const data = await
            products.findAll({
                include:[
                    {
                        model:categories
                    },
                    {
                        model:sellers
                    }
                ]
            })
          
                res.status(200).json(data)
            
        } catch (error) {
            next(error)
        }
    },
    getProductsId : async (req, res,next) => {
        try {
            const id = req.params.id;
            const data = await
            products.findOne({
                where:{
                    id
                },
                include:[
                    {
                        model:categories
                    },
                    {
                        model:sellers
                    }
                ]
            })
            if(!data) {
                throw {
                    status:404,
                    message : "not found",         
                }
            }else{
                res.status(200).json(data)
            }
            console.log("-------" +data);
        }catch(error)
        {
            next(error);
        }
    },
    createProduct: async (req,res,next) => {
        // const{body} = req;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
      
        try {
            const { name, price, stock, categoryId, sellerId } = req.body;           
            const data =  await   
            products.create({
                name: name,
                price: price,
                stock: stock,
                categoryId: categoryId,
                sellerId: sellerId
            })
           
                res.status(200).json(data)
            
        } catch (error) {
            next(error)
        }
    },
    updateProduct : async (req,res,next) => {
        try {
            const {id} = req.params;
            const {body} = req
            
            let findproducts = await products.findOne({
                where: {
                    id 
                }
            })
            if(findproducts === null){
                res.status(404).send({
                    msg : "update product is error",
                    status : 404,
                    error : "data is not found"
                })
            }else{
                products.update (body,{
                    where:{
                        id
                    }
                })
                res.status(200).send({
                    msg: "success updated",
                    status:200,
                    findproducts
                })
            }
        } catch (error) {
            next(error)
        }
    },
    deleteProduct : async (req,res,next) => {
        const {id} = req.params;
        try {
            let findproducts = await products.findOne({
                where : {
                    id
                }
            })
            if(findproducts === null){
                res.status(404).send({
                    msg: "delete product is error",
                    status: 404,
                    error: "data is not found"
                })
            }else{
                products.destroy({
                    where:({
                        id
                    })
                })
                res.status(200).send({
                    msg : "success deleted",
                    status: 200,
                    findproducts
                })
            }
        } catch (error) {
            next(error)
        }
    },
}