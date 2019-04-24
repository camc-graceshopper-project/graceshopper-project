import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders, statusOrders} from '../store/orders'
import {Link} from 'react-router-dom'

import './AllOrders.css'

class AllOrders extends React.Component {

    componentDidMount() {
        this.props.fetchOrders()
    }

    statusChange = (event) => {
      this.props.statusOrders(event.target.value)

    }
    render(){
        const orders = this.props.orders


        return(
          <div id="all-orders-page-container">
            <select onChange={this.statusChange} id="orders-dropdown-selector">
              <option>Filter By Status...</option>
              <option value='Created'>Created</option>
              <option value='Processing'>Processing</option>
              <option value='Completed'>Completed</option>
              <option value='Cancelled'>Cancelled</option>
            </select>
            <div>
              <ul className="orders-list">
                {orders.map(order => {

                    return(!order.products ? (
                      
                      <li key={order.id} >
                        <p>Order# {order.id}</p>
                        <p>Order Status: {order.status}</p>
                        <Link to={`/orders/${order.id}`}><h3>Order Details</h3></Link>
                      </li>
                    ) : (
                      order.products.map(product =>
                         (

                          <li key={product.id} className="all-orders-card">
                               <p>{product.name}</p>
                               <p>Order# {order.id}</p>
                               <p>Order Status: <span className="bold">{order.status}</span></p>
                               <Link className="order-detail-button" to={`/orders/${order.id}`}><h3>Order Details</h3></Link>

                          </li>

                    )))

                    )})}
              </ul>
            </div>
          </div>

        )
    }

}

const mapState = state => {
    return {
      orders: state.orders,
    }
  }

  const mapDispatch = dispatch => {
    return {
      fetchOrders: () => dispatch(fetchOrders()),
      statusOrders: (orderStatus) => dispatch(statusOrders(orderStatus))
    }
  }

export default connect(mapState, mapDispatch)(AllOrders)
