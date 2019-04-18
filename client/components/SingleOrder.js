import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleOrder, updateOneOrder} from '../store/singleOrder'

class SingleOrder extends React.Component {
  componentDidMount() {
    //console.log(this.props.match.params)
    this.props.fetchSingleOrder(this.props.match.params.orderId)
    //this.props.updateOneOrder(this.props.match.params.orderId, )
  }
  render() {
    //console.log(this.props)
    const order = this.props.singleOrder
    return order.status !== 'Completed' ? (
      <h1>Order Status is Incompleted!</h1>
    ) : (
      <div>
        <p>Order ID: {order.id}</p>
        <p>Total Price of Order: {order.totalPrice}</p>
        <p>Status: {order.status}</p>
        <button type='button'>Change Status</button>
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
    fetchSingleOrder: id => dispatch(fetchSingleOrder(id)),
    //updateOneOrder: (id, ) => dispatch(updateOneOrder(id,  ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
