import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATE_SINGLE_ORDER = 'UPDATE_SINGLE_ORDER'
/**
 * INITIAL STATE
 */
const defaultOrder = {}
/**
 * ACTION CREATORS
 */
const getSingleOrder = singleOrder => ({type: GET_SINGLE_ORDER, singleOrder})
const updateSingleOrder = (id, orderUpdates) => ({
  type: UPDATE_SINGLE_ORDER,
  id,
  orderUpdates
})
/**
 * THUNK CREATORS
 */
export const fetchSingleOrder = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(getSingleOrder(data))
  } catch (error) {
    console.log(error)
  }
}
export const updateOneOrder = (id, orderUpdates) => {
  return async dispatch => {
    try {
      await axios.patch(`/api/orders/${id}`, {
        updatedFields: {orderUpdates}
      })
      dispatch(updateSingleOrder(id, orderUpdates))
    } catch (error) {
      console.log(`ERROR updating order with id ${id}.`, error)
    }
  }
}

const singleOrderReducer = (state = defaultOrder, action) => {
  switch (action.type) {
    case GET_SINGLE_ORDER:
      return action.singleOrder
    case UPDATE_SINGLE_ORDER:

    default:
      return state
  }
}

export default singleOrderReducer
