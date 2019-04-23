import axios from 'axios'

//Action Types
const CREATE_REVIEWS = 'CREATE_REVIEWS'

//Initial State
const defaultReviews = []

//Action Creator
const createReview = (id, newReview) => {
  return {
    type: CREATE_REVIEWS,
    id,
    newReview
  }
}

//Thunk Creator
export const addNewReview = (id, newReview) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `/api/products/${id}/postreview`,
        newReview
      )
      dispatch(createReview(id, data))
    } catch (error) {
      console.log(error)
    }
  }
}

//Reducer
const reviewsReducer = (state = defaultReviews, action) => {
  switch (action.type) {
    case CREATE_REVIEWS:
      return [...state, action.newReview]
    default:
      return state
  }
}

export default reviewsReducer
