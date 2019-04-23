import axios from 'axios'
import {fetchCart} from './cart'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const FILTER_ORDER_STATUS = 'FILTER_ORDER_STATUS'
const CREATE_ORDER = 'CREATE_ORDER'

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

const filterOrders = (statusOrders) => {

    return {
        type: FILTER_ORDER_STATUS,
        statusOrders
    }
}

const orderCreated = () => {
    return {
        type: CREATE_ORDER
    }
}

/**
* THUNK CREATORS
*/

export const fetchOrders = () => {
    return async (dispatch) => {
        const { data } = await axios.get('/api/orders')
        dispatch(getOrders(data))
    }
}

export const statusOrders = (orderStatus) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/api/orders/status/${orderStatus}`)
        dispatch(filterOrders(data))
    }
}

// export const createOrder = (order) => {
//     return async (dispatch) => {
        
        
        
//     }
// }


export const completeCheckout = (charge, email) => {
    return async (dispatch) => {
        
        const orderCreationResponse = await axios.post('/api/orders', {
            charge,
            email
        })
        
        // fetch cart again cuz its empty now
        await fetchCart();
        
        history.push('/home')
        
        
    }
}


/**
* REDUCER
*/

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return action.orders
        case FILTER_ORDER_STATUS:
            return action.statusOrders
        default:
            return state
    }
}
