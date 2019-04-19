module.exports = {};

const addToCart = function (cart, newItem) {
  if (cart.some((cartItem) => {
    return cartItem.id === newItem.id
  })) {
    cart.forEach((cartItem) => {
      if (cartItem.id === newItem.id) {
        cartItem.cart.quantity = cartItem.cart.quantity + newItem.cart.quantity;
      }
    })
  } else {
    cart.push(newItem);
  }
  
  return cart;
  
}


module.exports.addToCart = addToCart;


