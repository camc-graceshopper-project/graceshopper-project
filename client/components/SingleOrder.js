import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSingleOrder, updateOneOrder } from '../store/singleOrder'
import orders from '../store/orders';
import { Card } from 'react-bootstrap'

import './SingleOrder.css'

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchSingleOrder(this.props.match.params.orderId)
  }
  render() {
    const order = this.props.singleOrder
    const products = order.products || [];
    
    let total = 0;
    products.forEach((item) => {
      total = total + item.price
    })
    
    return (
      <div>
        {!order.products ? (
          <div>No Products!</div>
        ) : (
            <div id="order-detail-page-container">

              {order.products.map(product => {

                return (
                  <div key={product.id}>
                    <div className="product-card">
                      <Link to={`/products/${product.id}`}>
                        <img className="product-image" src={product.image} />
                      </Link>

                      <div className="product-details">
                        <Link to={`/products/${product.id}`}>
                          <span className="product-name">{product.name}</span>
                        </Link>
                        <span>${product.price}</span>
                        <span>Quantity: 1</span>
                      </div></div></div>
                )
              })}
              <div>
                <h2>Total: ${total}</h2>
                </div>
              
              
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
