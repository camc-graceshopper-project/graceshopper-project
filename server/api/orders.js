const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  try {
    ////LINE8-12  SHOULD BE UNCOMMENTED LATER!!!
    // if (!User.isAdmin) {
    //   const err = new Error('You are not authorized!')
    //   err.status = 403
    //   return next(err)
    // }

    const order = await Order.findOne({
      where: {id: req.params.orderId}
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    //LINE26-30  SHOULD BE UNCOMMENTED LATER!!!
    // if (!User.isAdmin) {
    //   const err = new Error('You are not authorized!')
    //   err.status = 403
    //   return next(err)
    // }

    const order = await Order.findOne({
      where: {id: req.params.orderId}
    })

    const updatedOrder = await order.update(req.body)
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})
