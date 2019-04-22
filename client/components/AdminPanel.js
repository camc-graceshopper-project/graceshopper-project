import React from 'react'
import {Link} from 'react-router-dom'

export default class AdminPanel extends React.Component {
  render() {
    return (
      <div>
        <Link to="/adminpanel/postproduct">Create New Product</Link>
        <br />
        <br />
        <Link to="/add-category">Add New Category</Link>
        <br />
        <br />
        <Link to='/make-user-admin'>Make User An Admin</Link>
        <br />
        <br />
        <Link to="/orders">View All Orders</Link>
      </div>
    )
  }
}
