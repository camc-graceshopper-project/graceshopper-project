import React from 'react'
import {Link} from 'react-router-dom'

export default class AdminPanel extends React.Component {
  render() {
    return (
      <div>
        <Link to="/adminpanel/postproduct">Create New Product</Link>
        <br />
      </div>
    )
  }
}
