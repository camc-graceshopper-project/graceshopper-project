import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART';

/**
 * INITIAL STATE
 */
const defaultCart = [];

/**
 * ACTION CREATORS
 */
const addToStoreCart = (newCart) => ({type: ADD_TO_CART, newCart})

/**
 * THUNK CREATORS
 */
export const addToCart = (product) => async dispatch => {
  try {
    const updatedCart = await axios.post('/api/cart', product);
    dispatch(addToStoreCart(updatedCart.data))
  } catch (err) {
    console.log(err)
  }
}


/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.newCart
    default:
      return state
  }
}
