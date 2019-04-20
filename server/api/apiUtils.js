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

const removeFromCart = function(cart, oldItem) {
  let newCart = cart.filter((currentItem) => {
    return (currentItem.id !== oldItem.id)
  })
  return newCart;
}


module.exports.addToCart = addToCart;
module.exports.removeFromCart = removeFromCart;

