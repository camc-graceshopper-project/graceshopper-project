/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../store/cart'

import './ChangeQuantityCart.css'

class ChangeQuantityCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.product.cart.quantity
    }
    this.handleIncriment = this.handleIncriment.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  // make it so it updates cart and database when i increment and decrement
  
  
  async handleIncriment() {
    let newQuant = await this.state.quantity;
    newQuant++;
    this.setState({ quantity: newQuant })
    let newProductOrder = this.props.product;
    newProductOrder.cart = {quantity: this.state.quantity};
    this.props.addToCart(newProductOrder);
  }

  async handleDecrement() {
    let newQuant = await this.state.quantity;
    if (newQuant > 1) {
      newQuant--;
    }
    console.log(this.state.quantity)
    this.setState({ quantity: newQuant })
    console.log(this.state.quantity)
    let newProductOrder = this.props.product;
    newProductOrder.cart = {quantity: this.state.quantity};
    this.props.addToCart(newProductOrder);
  }

  render() {
    return (
      <div>
        <div id="button-container">
          <button type="button" onClick={this.handleIncriment}>+</button>
          <h3>{this.state.quantity}</h3>
          <button type="button" onClick={this.handleDecrement}>-</button>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product) => dispatch(addToCart(product))
  }
}

export default connect(null, mapDispatchToProps)(ChangeQuantityCart)
