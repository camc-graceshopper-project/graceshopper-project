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
  
  const token = req.body.token.id;
  const charge = await Stripe.charges.create({
    amount: 500,
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
  
  // check to see if i can get info from the checkout thingy
  console.log(req.body.charge);
  const email = req.body.charge.email;
  
  
  let cart;
  if (req.user.id) {
    let myUser = User.findByPk(req.user.id)
    cart = myUser.getProducts();
    // idk if this works. it SHOULD empty cart in database
    myUser.setProducts([]);
  } else {
    cart = req.session.cart;
    req.session.cart = [];
  }
  
  let sum = 0;
  cart.forEach((item) => {
    sum = sum + (item.cart.quantity * item.price)
  }) 
  
  // might have to declare userid not required on assocation
  const newOrder = {
    totalPrice: sum
  }
  
  const order = Order.create(newOrder);
  
  
  cart.forEach((item) => {
    let newAssociation = {
      quantity: item.order.quantity,
      price: item.cart.price,
      orderId: order.id,
      productId: item.id
    }
    OrderProduct.create(newAssociation)
  })
  
  res.json('testtttt');
  
})
