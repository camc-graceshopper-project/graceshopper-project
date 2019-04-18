import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import AddToCartButtonSingleProduct from './AddToCartButtonSingleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }
  
  
  render() {
    return (
      <div>
        <div>
        {this.props.singleProduct.name}
        <img src={this.props.singleProduct.image} />
        </div>
        <AddToCartButtonSingleProduct product={this.props.singleProduct}/>
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
