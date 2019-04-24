import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/orders'

import './OrderHistory.css'

export class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchOrderHistory(this.props.match.params.id)
  }
  render() {
    return (
      <div key="order-history-container">
        {!this.props.orders.orders ? (
          <div>You have no order history.</div>
        ) : (
          <div>
            {this.props.orders.orders.map(order => {
              return (
                <div key={order.id} className="order-card">
                  <p>Order ID: {order.id}</p>
                  <p>Total Price of Order: ${order.totalPrice}</p>
                  <p>Order Status: <span className="bold">{order.status}</span></p>
                  <br />
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}
const mapState = state => {
  return {
    orders: state.orders
  }
}
const mapDispatch = dispatch => {
  return {
    fetchOrderHistory: userId => dispatch(fetchOrderHistory(userId))
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
