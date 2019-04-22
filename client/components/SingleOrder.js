import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleOrder, updateOneOrder} from '../store/singleOrder'
import orders from '../store/orders'

class SingleOrder extends React.Component {
  componentDidMount() {
    //console.log(this.props.match.params)
    this.props.fetchSingleOrder(this.props.match.params.orderId)
    //this.props.updateOneOrder(this.props.match.params.orderId,  )
  }
  render() {
    console.log('SINGLE-ORDER', this.props.singleOrder)
    const order = this.props.singleOrder
    return (
      <div>
        <p>Order ID: {order.id}</p>
        <p>Total Price of Order: {order.totalPrice}</p>
        <p>Status: {order.status}</p>
        <Link to={`${order.id}/changeStatus`}>Edit Status</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleOrder: state.singleOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleOrder: id => dispatch(fetchSingleOrder(id))
    //updateOneOrder: (id, ) => dispatch(updateOneOrder(id,  ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
