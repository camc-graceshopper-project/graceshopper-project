import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import RemoveButton from './RemoveButton'
import ChangeQuantityCart from './ChangeQuantityCart'

class Cart extends React.Component {
  
  
  
  render() {
    const products = this.props.cart
    
    if (!products) {
      return <div>Your cart is empty!</div>
    }
    
    
    return (
      <div>
        
        {products.map(product => {
          return (
            
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.name}
                <img src={product.image} />
              </Link>
              
              <ChangeQuantityCart product={product}/>
              
              <RemoveButton product={product}/>
              
            </div>
            
          )
        })}
        
        <Link to='/checkout'>
          <button type="button">Checkout</button>
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
