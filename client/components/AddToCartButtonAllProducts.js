/* eslint-disable no-unused-vars */
import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'

//import './AddToCartButtonAllProducts.css'

const AddToCartButtonAllProducts = function(props) {
  let product = props.product;
  product.cart = {quantity: 1}

  const handleSubmit = function(event) {
    event.preventDefault();
    props.addToCart(product);
  }

  return (
    <div >
      <form  onClick={handleSubmit}>
        <button className='cart-button' type="submit">
          Add To Cart
        </button>
      </form>
    </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product) => dispatch(addToCart(product))
  }
}

export default connect(null, mapDispatchToProps)(AddToCartButtonAllProducts)
