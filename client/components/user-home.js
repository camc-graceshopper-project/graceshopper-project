import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import './user-home.css'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, id} = props
  return (
    <div id="home-page-container">
      <h3>Welcome, {email}</h3>
      <Link to={`/users/${id}/orderhistory`}>
        <button className="home-page-button" type="button">View Order History</button>
      </Link>
      <br />
      <Link to="/cart">
        <button className="home-page-button" type="button">Go to cart</button>
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
    id: state.user.id
  }
}
export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
