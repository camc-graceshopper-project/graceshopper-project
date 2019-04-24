import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TakeMoney from './TakeMoney';

import './CheckoutPage.css'

class CheckoutPage extends React.Component {
  
  
  
  render() {
    const products = this.props.cart
    let total = 0;
    products.forEach((item) => {
      total = total + (item.cart.quantity * item.price*100)
    })
    
    
    return (
      <div id="checkout-page-container">
        
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
                          <span>${product.price}</span>
                          <span>Quantity: {product.cart.quantity}</span>
            </div></div></div>
          )
        })}
        
        <h1>Total: ${(total/100).toFixed(2)}</h1>
        <div id="pay-button" >
        <TakeMoney amount={total}/>
        </div>
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

export default connect(mapStateToProps)(CheckoutPage)
