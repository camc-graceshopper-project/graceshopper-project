import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/categories'

class Checkbox extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const categories = this.props.categories
    return (
      <div>
        {categories.map(category => {
          return (
            <div key={category.id}>
              <input type="checkbox" onClick={} value={category.id} />
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
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox)
