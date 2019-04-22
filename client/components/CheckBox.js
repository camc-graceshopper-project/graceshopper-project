import React from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../store/categories'
import { fetchProducts } from '../store/products'
import { addFilterToStore, removeFilterFromStore, updateFiltersOnStore } from '../store/filterCategories'

import './CheckBox.css'

class Checkbox extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
    console.log(this.props);
  }

  async handleClick(event) {
    if (event.target.checked) {
      let currentCategories = this.props.filterCategories;
      currentCategories.push(event.target.value);
      this.props.updateFiltersOnStore(currentCategories);


    } else {
      let oldFilters = this.props.filterCategories;
      let newFilters = oldFilters.filter((cat) => {
        return cat !== event.target.value
      })
      await this.props.updateFiltersOnStore(newFilters);
    }
    let path = window.location.pathname;
    let splitPath = path.split('/');
    let page = splitPath[splitPath.length - 1]

    this.props.fetchProducts(page, this.props.filterCategories)
  }

  render() {
    let categories = this.props.categories

    return (

      <div>
          {categories.map((category) => {
            return (

              <div className="category-box" key={category.id}>
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
    categories: state.categories,
    filterCategories: state.filterCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchProducts: (page, categories) => dispatch(fetchProducts(page, categories)),
    updateFiltersOnStore: (filtersList) => dispatch(updateFiltersOnStore(filtersList))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox)
