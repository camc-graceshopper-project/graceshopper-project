import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const FILTER_ORDER_STATUS = 'FILTER_ORDER_STATUS'
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

/**
 * INITIAL STATE
 */

const initialState = []

/**
 * ACTION CREATORS
 */

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

const filterOrders = statusOrders => {
  return {
    type: FILTER_ORDER_STATUS,
    statusOrders
  }
}

const getOrderHistory = orderHistory => {
  return {
    type: GET_ORDER_HISTORY,
    orderHistory
  }
}

/**
 * THUNK CREATORS
 */

export const fetchOrders = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/orders')
    dispatch(getOrders(data))
  }
}

export const statusOrders = orderStatus => {
  return async dispatch => {
    const {data} = await axios.get(`/api/orders/status/${orderStatus}`)
    dispatch(filterOrders(data))
  }
}

export const fetchOrderHistory = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${userId}/orderhistory`)
    dispatch(getOrderHistory(data))
  }
}

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case FILTER_ORDER_STATUS:
      return action.statusOrders
    case GET_ORDER_HISTORY:
      return action.orderHistory
    default:
      return state
  }
}
