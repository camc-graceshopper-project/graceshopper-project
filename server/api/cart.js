const router = require('express').Router()
module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
    
//     res.json()
//   } catch (err) {
//     next(err)
//   }
// })

// initialize empty cart array if one does not exist
router.use('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
})

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
