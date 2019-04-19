const router = require('express').Router()
const {Order} = require('../db/models')
const {isAdmin, isAdminOrIsUser} = require('../middleware/auth.middeware')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {id: req.params.orderId}
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {id: req.params.orderId}
    })

    const updatedOrder = await order.update(req.body)
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

router.get('/status/:status', async (req, res, next) => {
  try{
    const statusOrders = await Order.findAll({
      where: {
        status: req.params.status
      }
    })
    res.json(statusOrders)
  }catch(error){
    next(error)
  }
})
