/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/products'
import AddToCartButtonAllProducts from './AddToCartButtonAllProducts'
import CheckBox from './CheckBox'

class AllProducts extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchProducts(this.props.match.params.page, this.props.filterCategories)
  }
  
  async handleClick(newPage) {
    
    await this.props.history.push(newPage)
    this.props.fetchProducts(this.props.match.params.page, this.props.filterCategories);
  }
  
  render() {
    const thisPage = Number(this.props.match.params.page);
    const products = this.props.products
    return (
      <div>

        <div>
          <CheckBox />
        </div>

        <div>
          {thisPage > 1 &&
            <Link to={`/all-products/${thisPage - 1}`}>
              <button type="button" onClick={() => this.handleClick(thisPage - 1)}>{" < "}</button>
            </Link>
          }

          <Link to={`/all-products/${thisPage + 1}`}>
            <button type="button" onClick={() => this.handleClick(thisPage + 1)}>{" > "}</button>
            </Link>
        </div>

        {!products.length ? (
          <div>No Candies!</div>
        ) : (
            <div>
              <Link to='/add-category'>Add Category</Link>
              <br />
              <br />
              {products.map(product => {
                return (
                  <div key={product.id}>
                    <Link to={`/products/${product.id}`}>
                      {product.name}
                      <img src={product.image} />
                    </Link>
                    <AddToCartButtonAllProducts product={product} />
                    <br />
                    <br />
                  </div>
                )
              })}
            </div>
          )}

        <div>
          {thisPage > 1 &&
            <Link to={`/all-products/${thisPage - 1}`}>
              <button type="button" onClick={() => this.handleClick(thisPage - 1)}>{" < "}</button>
            </Link>
          }

          <Link to={`/all-products/${thisPage + 1}`}>
            <button type="button" onClick={() => this.handleClick(thisPage + 1)}>{" > "}</button>
          </Link>
        </div>

      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    filterCategories: state.filterCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: (page, categories) => dispatch(fetchProducts(page, categories))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
