import axios from 'axios'

//Action Types
const GET_CATEGORIES = 'GET_CATEGORIES'

//Initial State
const defaultCategories = []

//Action Creator

const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

//Thunk Creator

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/categories')
      dispatch(getCategories(res.data || defaultCategories))
    } catch (err) {
      console.error(err)
    }
  }
}

//Reducer
const categoriesReducer = (state = defaultCategories, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default categoriesReducer
