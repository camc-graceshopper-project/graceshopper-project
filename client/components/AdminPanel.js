import React from 'react'
import {Link} from 'react-router-dom'

import './AdminPanel.css'

export default class AdminPanel extends React.Component {
  render() {
    return (
      <div id="admin-panel-container">
        <Link className="admin-link" to="/adminpanel/postproduct">Create New Product</Link>
        <Link className="admin-link" to="/add-category">Add New Category</Link>

        <Link className="admin-link" to='/make-user-admin'>Make User An Admin</Link>

        <Link className="admin-link" to="/orders">View All Orders</Link>
      </div>
    )
  }
}
