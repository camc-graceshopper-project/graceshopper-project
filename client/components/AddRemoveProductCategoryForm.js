import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'



export class AddRemoveCategoryForm extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            category: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.addSubmit = this.addSubmit.bind(this)
        this.removeSubmit = this.removeSubmit.bind(this)
    }


    handleChange (evt) {
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    async addSubmit (evt) {
        try {
            evt.preventDefault()
            await axios.post(`/api/products/${this.props.match.params.productId}/editproduct/addCategory`, this.state)
            this.setState({
                category: ''
            })
        } catch (err) {
            console.log(err)
        }
    }

    async removeSubmit (evt) {
        try {
            evt.preventDefault()
            await axios.delete(`/api/products/${this.props.match.params.productId}/editproduct/removeCategory`, {data: this.state })
            this.setState({
                category: ''
            })
        } catch (err) {
        console.log(err)
    }

    }

    render(){

        return(
          <form >
            <div>
                <h2>Add or Remove Product Category</h2>

                <label htmlFor='category'>Category:</label>
                <br />
                <input
                    type='text'
                    name='category'
                    value={this.state.category}
                    onChange={this.handleChange}
                />
                <button type='submit' onClick={this.addSubmit}>Add</button>
                <button type='submit' onClick={this.removeSubmit}>Remove</button>
            </div>
          </form>
        )
    }
}

const mapState = state => {
    return {
      singleProduct: state.singleProduct
    }
  }


  export default connect(mapState)(AddRemoveCategoryForm)