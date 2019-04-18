/* eslint-disable no-unused-vars */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import AddToCartButtonAllProducts from './AddToCartButtonAllProducts'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const products = this.props.products
    const filteredProducts = products.filter(product => {
      return product.inventory > 0
    })
    return !products.length ? (
      <div>No Candies!</div>
    ) : (
      <div>
        {filteredProducts.map(product => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.name}
                <img src={product.image} />
              </Link>
              <AddToCartButtonAllProducts product={product} />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
