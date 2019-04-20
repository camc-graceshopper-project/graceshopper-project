/* eslint-disable no-unused-vars */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import AddToCartButtonAllProducts from './AddToCartButtonAllProducts'
import CreateNewProductForm from './CreateNewProductForm'
import CheckBox from './CheckBox'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const products = this.props.products
    return !products.length ? (
      <div>No Candies!</div>
    ) : (
      <div>
        <CreateNewProductForm />
        <Link to="/add-category">Add Category</Link>
        <br />
        <br />
        <div>
          <CheckBox />
        </div>
        {products.map(product => {
          return (
            <div key={product.id}>
              <br />
              <Link to={`/products/${product.id}`}>
                {product.name}
                <br />
                <img src={product.image} />
                <h4>Price: ${product.price}</h4>
              </Link>
              <AddToCartButtonAllProducts product={product} />
              <br />
              <br />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
