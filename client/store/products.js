import axios from 'axios'

//Action Types
const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

//Initial State
const defaultProducts = []

//Action Creator
const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}
const createNewProduct = newProduct => {
  return {
    type: CREATE_PRODUCT,
    newProduct
  }
}

//Thunk Creator
export const fetchProducts = (categories = []) => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products', {
        params: {categories: categories}
      })
      dispatch(getProducts(res.data || defaultProducts))
    } catch (err) {
      console.error(err)
    }
  }
}
export const addNewProduct = newProduct => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/products`, newProduct)
      dispatch(createNewProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//Reducer

const productsReducer = (state = defaultProducts, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.newProduct]
    default:
      return state
  }
}

export default productsReducer
