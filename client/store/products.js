import axios from 'axios'

//Action Types
const GET_PRODUCTS = 'GET_PRODUCTS'

//Initial State
const defaultProducts = []

//Action Creator

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

//Thunk Creator

export const fetchProducts = (categories = []) => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products', {params: 
        {categories: categories}
      })
      dispatch(getProducts(res.data || defaultProducts))
    } catch (err) {
      console.error(err)
    }
  }
}

//Reducer

const productsReducer = (state = defaultProducts, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
