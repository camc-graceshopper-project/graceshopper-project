/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../store/cart'

class AddToCartButtonSingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleIncriment = this.handleIncriment.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async handleIncriment() {
    let newQuant = await this.state.quantity;
    newQuant++;
    this.setState({ quantity: newQuant })
  }

  async handleDecrement() {
    let newQuant = await this.state.quantity;
    if (newQuant > 1) {
      newQuant--;
    }
    this.setState({ quantity: newQuant })
  }

  handleSubmit(event) {
    event.preventDefault();
    let newProductOrder = this.props.product;
    newProductOrder.quantity = this.state.quantity;
    this.props.addToCart(newProductOrder);
  }

  render() {
    return (
      <div>
        <div>
          <button type="button" onClick={this.handleIncriment}>+</button>
          <h3>{this.state.quantity}</h3>
          <button type="button" onClick={this.handleDecrement}>-</button>
        </div>
        <div>
          <form onClick={this.handleSubmit}>
            <button type="submit">Add To Cart</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product) => dispatch(addToCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButtonSingleProduct)
