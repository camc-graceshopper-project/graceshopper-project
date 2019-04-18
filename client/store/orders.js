import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */

const initialState = []


/**
 * ACTION CREATORS
 */

const getOrders = (orders) => {

    return {
        type: GET_ORDERS,
        orders
    }
}


 /**
 * THUNK CREATORS
 */

export const fetchOrders = () => {

    return async (dispatch) => {
        const {data} = await axios.get('/api/orders')
        dispatch(getOrders(data))
    }
}


 /**
 * REDUCER
 */

 export default function(state = initialState, action) {
     switch(action.type){
         case GET_ORDERS:
            return action.orders
        default:
            return state
     }
 }