/* eslint-disable no-unused-vars */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'

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
        {products.map(product => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.name}
                <img src={product.image} />
              </Link>
              {/* <button type="button" onClick */}
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

export default connect(mapDispatchToProps, mapDispatchToProps)(AllProducts)
