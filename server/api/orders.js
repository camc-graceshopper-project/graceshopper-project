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

router.post('/', async (req, res, next) => {
  try {
    let token = req.body.stripeToken;
    let orderItems = req.body.order;
    let email = req.body.email;
    let userId = req.user.id
    if (userId === undefined) {
      userId = null;
    }
    //  might have to turn off required for the association. idk
      // if itll work or not well see. (i know its something you can do
      // i just dunno if necessary or not)
      
    // format to appropriate thingy.
    // if no userId make email null i guess
    
    
    
    
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
    // after this line above. send an email to the associated email address with the order. saying that the status has changed to 'x'
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
