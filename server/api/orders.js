/* eslint-disable camelcase */
const router = require('express').Router()
const {Order, User, Product, OrderProduct} = require('../db/models')
const Mailgun = require('mailgun-js')
const {isAdmin, isAdminOrIsUser} = require('../middleware/auth.middeware')
module.exports = router
const keySecret = process.env.STRIPE_KEY
const Stripe = require('stripe')(keySecret);


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


router.post('/save-stripe-token', async (req, res, next) => {
  
  const amount = req.body.amount;
  
  const token = req.body.token.id;
  const charge = await Stripe.charges.create({
    amount: amount,
    currency: 'usd',
    description: 'Example charge',
    source: token
  })
  
  res.json(charge);
  
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
      to: 'Christa Kaspo <christa.kaspo@gmail.com>',
      subject: `Order Status Update`,
      text: `Hello ${req.user.email}, your order is ${updatedOrder.status}.`
    }
    mailgun.messages().send(email, function(error, body) {
      if (error) {
        console.log(error)
      }
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



router.post('/', async (req, res, next) => {
  try{
  // check to see if i can get info from the checkout thingy
  const email = req.body.email;
  const amount = req.body.charge;
  
  let cart;
  if (req.user.id) {
    let myUser = await User.findByPk(req.user.id)
    cart = await myUser.getProducts();
    // idk if this works. it SHOULD empty cart in database
    await myUser.setProducts([]);
  } else {
    cart = req.session.cart;
    req.session.cart = [];
  }
  
  
  let orderUserId = req.user.id || null;
  const newOrder = {
    totalPrice: amount,
    status: 'Created',
    email,
    userId: orderUserId
  }
  
  const order = await Order.create(newOrder);
  
  
  
  cart.forEach((item) => {
    let newAssociation = {
      quantity: item.cart.quantity,
      price: item.price,
      orderId: order.id,
      productId: item.id
    }
    OrderProduct.create(newAssociation)
  })
  
  res.json('order made succesfully');
} catch (err) {
  next(err);
}
})
