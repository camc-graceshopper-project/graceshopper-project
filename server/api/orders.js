const router = require('express').Router()
const {Order, Product} = require('../db/models')
const Mailgun = require('mailgun-js')
const {isAdmin, isAdminOrIsUser} = require('../middleware/auth.middeware')
module.exports = router

var api_key = 'f6db9e78db3473fe581560d3627f7792-3fb021d1-4dd33531'
var DOMAIN = 'sandbox51ac6892196a4c74839719aab3fc4eed.mailgun.org'
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN})

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      include: [Product]
    })
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {id: req.params.orderId},
      include: [Product]
    })
    console.log('ORDER', order.products[0].id)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
      }
    })

    const updatedOrder = await order.update(req.body)
    let email = {
      from:
        'Mailgun Sandbox <postmaster@sandbox51ac6892196a4c74839719aab3fc4eed.mailgun.org>',
      to: `Christa Kaspo <christa.kaspo@gmail.com>`,
      subject: `Order Status Update`,
      text: `Hello ${req.user.email}, your order is ${updatedOrder.status}.`
    }
    mailgun.messages().send(email, function(error, body) {
      if (error) {
        console.log(error)
      }
      console.log(body)
      res.json(updatedOrder)
    })
  } catch (error) {
    next(error)
  }
})

router.get('/status/:status', async (req, res, next) => {
  try {
    const statusOrders = await Order.findAll({
      where: {
        status: req.params.status
      },
      include: [Product]
    })
    res.json(statusOrders)
  } catch (error) {
    next(error)
  }
})
