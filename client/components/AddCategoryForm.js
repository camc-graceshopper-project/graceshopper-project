import React from 'react'
import {connect} from 'react-redux'
import {postCategory} from '../store/categories'


export class AddCategoryForm extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange (evt) {
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    handleSubmit (evt) {
        evt.preventDefault()
        this.props.postCategory(this.state)
        this.setState({
            name: ''
        })
    }

    render(){

        return(
          <form onSubmit={this.handleSubmit}>
            <div>
                <h3>Add Category:</h3>
                <label htmlFor='name'>Name:</label>
                <br />
                <input
                    type='text'
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <button type='submit'>Add</button>
            </div>
          </form>
        )
    }
}

const mapState = state => {

    return {
        categories: state.categories
    }


}

const mapDispatch = dispatch => {

    return {
        postCategory: (category) => dispatch(postCategory(category))
    }
}

export default connect(mapState, mapDispatch)(AddCategoryForm)