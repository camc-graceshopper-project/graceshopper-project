import axios from 'axios'

//Action Types
const GET_PRODUCTS = 'GET_PRODUCTS'

//Initial State
const products = []

//Action Creator

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

//Thunk Creator

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products')
      dispatch(getProducts(res.data || products))
    } catch (err) {
      console.error(err)
    }
  }
}
