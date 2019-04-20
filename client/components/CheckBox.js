import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/categories'
import {fetchProducts} from '../store/products'


class Checkbox extends React.Component {
  constructor() {
    super()
    this.state = {
      checkedCats: []
    }
    
    this.handleClick = this.handleClick.bind(this)
  }
  
  componentDidMount() {
    this.props.fetchCategories()
  }
  
  async handleClick(event) {
    if (event.target.checked) {
      let currentState = this.state.checkedCats;
      currentState.push(event.target.value);
      this.setState({checkedCats: currentState})

      
    } else {
      let oldState = this.state.checkedCats;
      let newState = oldState.filter((cat) => {
        return cat !== event.target.value
      })
      await this.setState({checkedCats: newState})
    }
    this.props.fetchProducts(this.state.checkedCats)
  }
  
  render() {
    let categories = this.props.categories
    
    return (
      <div>
        {categories.map((category) => {
          return (
            <div key={category.id}>
              <input type="checkbox" onClick={this.handleClick} value={category.name} />
              <h5>{category.name}</h5>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchProducts: (categories) => dispatch(fetchProducts(categories))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox)
