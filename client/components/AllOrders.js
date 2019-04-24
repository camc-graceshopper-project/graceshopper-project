import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders, statusOrders} from '../store/orders'
import {Link} from 'react-router-dom'


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
          <div>
            <select onChange={this.statusChange}>
              <option>Filter By Status...</option>
              <option value='Created'>Created</option>
              <option value='Processing'>Processing</option>
              <option value='Completed'>Completed</option>
              <option value='Cancelled'>Cancelled</option>
            </select>
            <div>
              <ol>
                {orders.map(order => {

                    return(!order.products ? (
                      <li key={order.id}>
                        <p>Order# {order.id}</p>
                        <p>Order Status: {order.status}</p>
                        <Link to={`/orders/${order.id}`}><h3>Order Details</h3></Link>
                      </li>
                    ) : (
                      order.products.map(product =>
                         (

                          <li key={product.id}>
                               <p>{product.name}</p>
                               <p>Order# {order.id}</p>
                               <p>Order Status: {order.status}</p>
                               <Link to={`/orders/${order.id}`}><h3>Order Details</h3></Link>

                          </li>

                    )))

                    )})}
              </ol>
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