import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import AddToCartButtonSingleProduct from './AddToCartButtonSingleProduct'
import {Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <div>
          {this.props.singleProduct.name}
          <br />
          <img src={this.props.singleProduct.image} />
        </div>
        {this.props.singleProduct.inventory ? (
          <div>
            <p>
              Product Description:
              {this.props.singleProduct.description}
            </p>
            <AddToCartButtonSingleProduct product={this.props.singleProduct} />
            <Link
              to={`/products/${this.props.singleProduct.id}/editproduct`}
              propduct={this.props.singleProduct}
            >
              <button type="button">Edit Product</button>
            </Link>
          </div>
        ) : (
          <div>Currently unavailable.</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
