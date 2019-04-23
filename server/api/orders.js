/* eslint-disable camelcase */
const router = require('express').Router()
const {Order, User, Product, OrderProduct} = require('../db/models')
const {isAdmin, isAdminOrIsUser} = require('../middleware/auth.middeware')
module.exports = router
const keySecret = process.env.STRIPE_KEY
const Stripe = require('stripe')(keySecret);


router.get('/', isAdmin, async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})


router.post('/save-stripe-token', async (req, res, next) => {
  
  console.log('===========')
  
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




// router.post('/', async (req, res, next) => {
//   try {
//     let token = req.body.stripeToken;
//     let orderItems = req.body.order;
//     let email = req.body.email;
//     let userId = req.user.id
//     if (userId === undefined) {
//       userId = null;
//     }
//     //  might have to turn off required for the association. idk
//       // if itll work or not well see. (i know its something you can do
//       // i just dunno if necessary or not)
      
//     // format to appropriate thingy.
//     // if no userId make email null i guess
    
    
//     const charge = await Stripe.checkout.sessions.create({
//       success_url: '',
//       cancel_url: '',
//       payment_method_types: ['card'],
//       line_items: [{
//         // fill this in
//         amount: 500,
//         currency: 'usd',
//         // fill this in
//         name: 'T-shirt',
//         // fill this in
//         description: 'Comfortable cotton t-shirt',
//       }]
//     })
    
//     res.json('hello');
    
//   } catch (err) {
//     next(err)
//   }
// })

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
