const router = require('express').Router()
const {Order} = require('../db/models')
const { isAdmin, isAdminOrIsUser } = require('../middleware/auth.middeware')
module.exports = router


router.get('/', isAdmin, async (req, res, next) => {
    try{
        const allOrders = await Order.findAll()
        res.json(allOrders)

    }catch(err){
        next(err)
    }
})





