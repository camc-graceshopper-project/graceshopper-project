import {connect} from 'react-redux'
import React from 'react'
import {getFilteredProducts} from '../store/products'

export class SearchBar extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            search: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })

    }

    async handleSubmit (evt) {
        try{
        evt.preventDefault()
        await this.props.filteredProducts(this.state)
        } catch (err) {
            console.log(err)
        }
    }

    render(){

        return(
          <form onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor='search'></label>
                <br />
                <input
                    type='text'
                    name='search'
                    placeholder='Candy Search'
                    value={this.state.search}
                    onChange={this.handleChange}
                />
                <button type='submit'>Search</button>
            </div>
          </form>
        )
    }
}

const mapState = state => {

    return {
        products: state.products
    }

}

const mapDispatch = dispatch => {
    return {
    filteredProducts: (search) => dispatch(getFilteredProducts(search))
    }
}

export default connect(mapState, mapDispatch)(SearchBar)

