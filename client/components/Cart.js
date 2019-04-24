import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import RemoveButton from './RemoveButton'
import ChangeQuantityCart from './ChangeQuantityCart'

import './Cart.css'

class Cart extends React.Component {
  render() {
    const products = this.props.cart

    if (!products) {
      return <div>Your cart is empty!</div>
    }

    return (
      <div id="cart-container">
        {products.map(product => {
          return (
            <div key={product.id}>
                        <div className="product-card">
                          <Link to={`/products/${product.id}`}>
                            <img className="product-image" src={product.image} />
                          </Link>
                          
                          <div className="product-details">
                          <Link  to={`/products/${product.id}`}>
                            <span className="product-name">{product.name}</span>
                          </Link>
                          

              <ChangeQuantityCart product={product} />

              <RemoveButton product={product} />
              </div></div>
            </div>
          )
        })}
        
        <Link to='/checkout'>
          <button id="checkoutButton" type="button">Checkout</button>
        </Link>
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchProducts: () => dispatch(fetchProducts())
//   }
// }

export default connect(mapStateToProps)(Cart)
