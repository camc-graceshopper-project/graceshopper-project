import axios from 'axios'

//Action Types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//Initial State
const defaultSingleProduct = {}

//Action Creator
const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

//Thunk Creator
export const fetchSingleProduct = id => {
  return async dispatch => {
    let response = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(response.data))
  }
}

//Reducer
const singleProductReducer = (state = defaultSingleProduct, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProductReducer
