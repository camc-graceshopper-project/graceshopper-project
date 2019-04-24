import axios from 'axios'
import history from '../history'
import {fetchCart} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const deleteUser = id => ({type: DELETE_USER, id})
const updateUserPassword = (token, newPassword) => ({
  type: UPDATE_USER_PASSWORD,
  token,
  newPassword
})

/**
 * THUNK CREATORS
 */

export const changePassword = (token, newPassword) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/reset/${token}`, newPassword)
    dispatch(updateUserPassword(token, res.data))
  } catch (error) {
    console.log(error)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUserThunk = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/users/${id}`)
    dispatch(deleteUser(id))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }

  try {
    dispatch(fetchCart())
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }

  try {
    dispatch(fetchCart())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user

    case DELETE_USER:
      const updatedUsers = state.filter(user => user.id !== action.id)
      return updatedUsers

    case UPDATE_USER_PASSWORD:
      console.log(action.newPassword)
      return {...state, password: action.newPassword}
    // const updatedUsers = state.filter(user => user.id !== action.id)
    // return updatedUsers
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
