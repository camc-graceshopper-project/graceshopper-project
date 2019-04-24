import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, id, user} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Link to={`/users/${id}/orderhistory`}>
        <button type="button">View Order History</button>
      </Link>
      <br />
      <Link to="/cart">
        <button type="button">Go to cart</button>
      </Link>
      <br />
      <Link to={`/users/reset/${user.resetPasswordToken}`}>
        <button type="button">Reset Password</button>
      </Link>
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id,
    user: state.user
  }
}
export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
