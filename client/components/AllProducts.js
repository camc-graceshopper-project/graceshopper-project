/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/products'
import AddToCartButtonAllProducts from './AddToCartButtonAllProducts'
import CheckBox from './CheckBox'
import { Card } from 'react-bootstrap'

import './AllProducts.css'

class AllProducts extends React.Component {
  constructor() {
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
        <div id="page-container">

          <div id="left-side">
            <CheckBox />
          </div>

          <div id="right-side">
            <div>
              <div className="buttons">
                {thisPage > 1 &&
                  <Link to={`/all-products/${thisPage - 1}`}>
                    <button className="page-buttons" type="button" onClick={() => this.handleClick(thisPage - 1)}>{" < "}</button>
                  </Link>
                }

                <Link to={`/all-products/${thisPage + 1}`}>
                  <button className="page-buttons" type="button" onClick={() => this.handleClick(thisPage + 1)}>{" > "}</button>
                </Link>
              </div>
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
                      
                        <div className="product-card">
                          <Link to={`/products/${product.id}`}>
                            <img className="product-image" src={product.image} />
                          </Link>
                          
                          <div className="product-details">
                          <Link  to={`/products/${product.id}`}>
                            <span className="product-name">{product.name}</span>
                          </Link>
                          
                          <AddToCartButtonAllProducts product={product} />
                          </div>
                        </div>
                        
                      </div>

                    )
                  })}
                </div>
              )}

            <div>
              <div className="buttons">
                {thisPage > 1 &&
                  <Link to={`/all-products/${thisPage - 1}`}>
                    <button className="page-buttons" type="button" onClick={() => this.handleClick(thisPage - 1)}>{" < "}</button>
                  </Link>
                }

                <Link to={`/all-products/${thisPage + 1}`}>
                  <button className="page-buttons" type="button" onClick={() => this.handleClick(thisPage + 1)}>{" > "}</button>
                </Link>
              </div>
            </div>

          </div>
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
