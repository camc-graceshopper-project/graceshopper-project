import React from 'react'
import {connect} from 'react-redux'
import {editOneProduct} from '../store/products'

export class EditProductForm extends React.Component {
  constructor(props) {
    const {description, name, image, inventory, price} = props.singleProduct
    super(props)
    this.state = {
      name,
      description,
      image,
      inventory,
      price
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const editProduct = this.state
    this.props.editOneProduct(this.props.match.params.productId, editProduct)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h2>Edit the Product: </h2>
          <label>Product Name: </label>
          <br />
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>

        <br />
        <div>
          <label>Product Description: </label>
          <br />
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <br />
        <div>
          <label>Product Image: </label>
          <br />
          <input
            type="text"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
          />
        </div>

        <br />
        <div>
          <label>Product Inventory: </label>
          <br />
          <input
            type="integer"
            name="inventory"
            value={this.state.inventory}
            onChange={this.handleChange}
          />
        </div>

        <br />
        <div>
          <label>Product Price: </label>
          <br />
          <input
            type="float"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapState = state => ({
  singleProduct: state.singleProduct
})

const mapDispatch = dispatch => {
  return {
    editOneProduct: (id, newProductInfo) =>
      dispatch(editOneProduct(id, newProductInfo))
  }
}

export default connect(mapState, mapDispatch)(EditProductForm)
