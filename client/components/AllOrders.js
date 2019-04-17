import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import {Link} from 'react-router-dom'


class AllOrders extends React.Component {

    componentDidMount() {
        this.props.fetchOrders()
    }

    render(){
        const orders = this.props.orders
        if(!orders.length){
            return <div>No orders to display</div>
        }
        return(
            <div>
                {orders.map(order => {
                    return (
                        <div key={order.id}>
                          <Link to={`/order/${order.id}`}>
                             <p>Order Status: {order.status}</p>
                             <p>Order Price: {order.totalPrice}</p>
                          </Link>
                        </div>
                      )
                })}
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
      fetchOrders: () => dispatch(fetchOrders())
    }
  }

export default connect(mapState, mapDispatch)(AllOrders)