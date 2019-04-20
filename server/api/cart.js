const router = require('express').Router()
const { Cart, User, Product } = require('../db/models')
const { isAdmin, isAdminOrIsUser } = require('../middleware/auth.middeware')
const { addToCart } = require('./apiUtils');
module.exports = router


// initialize empty cart array if one does not exist
router.use('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
})

// get cart from session or from database if user
router.get('/', async (req, res, next) => {
  try {
    
    if (!req.user) {
      // console.log('not logged in cart');
      // console.log(req.session.cart);
      res.json(req.session.cart);
    } else {



      let myUser = await User.findByPk(req.user.id);
      let myCart = await myUser.getProducts();

      // if there is any items on session. put it onto cart
      // all this block of code below does that
      if (req.session.cart.length) {
        let newCart = myCart;
        req.session.cart.forEach((item) => {
          let tempCart = addToCart(newCart, item);
          newCart = tempCart;
        })
        req.session.cart = []
        const destroyedItems = await Cart.destroy({ where: { userId: req.user.id } })
        
        let associationsToMake = [];
        newCart.forEach((item) => {
          let association = { productId: item.id, userId: req.user.id, quantity: item.cart.quantity }
          associationsToMake.push(association);
        })
        let cartData = await Cart.bulkCreate(associationsToMake)
        myCart = cartData;
      }
      
      
      // console.log('logged in cart');
      // console.log(myCart);
      res.json(myCart);
    }

  } catch (err) {
    next(err)
  }
})

// test route to /api/cart/1 to show what cart looks like
// router.get('/1', async (req, res, next) => {
//   try {
//     let myUser = await User.findByPk(1);
//     let myCart = await myUser.getProducts();
//     res.json(myCart);
//   } catch (err) {
//     next(err)
//   }
// })


router.post('/', async (req, res, next) => {
  try {

    const newCartItem = req.body;

    // if not logged in :
    if (!req.user) {
      // console.log(req.user);
      // not logged in do this stuff
      let currentCart = req.session.cart;
      let newCart = addToCart(currentCart, newCartItem);
      req.session.cart = newCart;
      res.json(newCart);

    } else {
      // is logged in do this stuff
      let myUser = await User.findByPk(req.user.id);
      let currentCart = await myUser.getProducts();

      let newCart = addToCart(currentCart, newCartItem);

      // destroy all and create new ones
      const destroyedItems = await Cart.destroy({ where: { userId: req.user.id } })

      // craete new ones
      let associationsToMake = [];
      newCart.forEach((item) => {
        let association = { productId: item.id, userId: req.user.id, quantity: item.cart.quantity }
        associationsToMake.push(association);
      })
      let cartData = await Cart.bulkCreate(associationsToMake)

      res.json(cartData);
    }
  } catch (error) {
    next(error)
  }
})

