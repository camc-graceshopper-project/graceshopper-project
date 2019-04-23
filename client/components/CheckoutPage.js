import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TakeMoney from './TakeMoney';

class CheckoutPage extends React.Component {
  
  
  
  render() {
    const products = this.props.cart
    let total = 0;
    products.forEach((item) => {
      total = total + (item.cart.quantity * item.price*100)
    })
    
    
    return (
      <div>
        
        {products.map(product => {
          return (
            
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.name}
                <img src={product.image} />
              </Link>
              
            </div>
            
          )
        })}
        
        <TakeMoney amount={total}/>
        
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
