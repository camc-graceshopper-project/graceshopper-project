const router = require('express').Router()
module.exports = router

// initialize empty cart array if one does not exist
router.use('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
})

// get cart from session or from database if user
// router.get('/', async (req, res, next) => {
//   try {
    
//     res.json()
//   } catch (err) {
//     next(err)
//   }
// })


router.post('/', (req, res, next) => {
  const newCartItem = req.body;
  let currentCart = req.session.cart;
  
  // check if current item already exists in cart, if so, update quantity for that item.
  // let currentCartProductIds;
  // currentCart.forEach((product) => {
  //   currentCartProductIds.push(product.id)
  // });
  
  // if (currentCartProductIds.includes(newCartItem.id)) {
    
  // }
  
  // quantity should be on item that is given to us. on the object
  
  currentCart.push(newCartItem);
  req.session.cart = currentCart;
  
  res.json(currentCart)
})

