import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleOrder, updateOneOrder} from '../store/singleOrder'
import orders from '../store/orders';
import {Card} from 'react-bootstrap'


class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchSingleOrder(this.props.match.params.orderId)
  }
  render() {
    const order = this.props.singleOrder
    return (
      <div>
    {!order.products ? (
      <div>No Products!</div>
    ) : (
        <div>

          {order.products.map(product => {

            return (
              <div key={product.id}>
                  <h1>Order Details</h1>
                  <p>Order# {order.id}</p>
                  <img src={product.image} />
                  <p>Order Placed {order.createdAt.slice(0,10)}</p>
                  <h3>{product.name}</h3>
                  <p>Product Description: {product.description}</p>
                  <p>Quantity: {product['order-product'].quantity}</p>
                  <p>Order Total: ${order.totalPrice}</p>
                  <p>Status: {order.status}</p>
              </div>
            )
          })}
        </div>
      )}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
