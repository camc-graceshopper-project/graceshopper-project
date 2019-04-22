import axios from 'axios'

//Action Types
const ADD_FILTER = 'ADD_FILTER'
const REMOVE_FILTER = 'REMOVE_FILTER'
const RESET_FILTERS = 'RESET_FILTERS'
const UPDATE_FILTERS = 'UPDATE_FILTERS'

//Initial State
const defaultFilters = []

//Action Creator

const addFilter = category => {
  return {
    type: ADD_FILTER,
    category
  }
}

const removeFilter = category => {
  return {
    type: REMOVE_FILTER,
    category
  }
}

const resetFilters = () => {
  return {
    type: RESET_FILTERS
  }
}

const updateFilters = (filterList) => {
  return {
    type: UPDATE_FILTERS,
    filterList
  }
}

//Thunk Creator

// export const fetchProducts = (page, categories = []) => {
//   return async dispatch => {
//     try {
      
//       const res = await axios.get(`/api/products/all/${page}`, {params: 
//         {categories: categories}
//       })
//       dispatch(getProducts(res.data || defaultProducts))
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

export const updateFiltersOnStore = (filterList) => {
  return dispatch => {
    dispatch(updateFilters(filterList))
  }
};

export const resetFiltersOnStore = () => {
  return dispatch => {
    dispatch(resetFilters())
  }
}


//Reducer

// let oldFilters;
// let newFilters;
const productsReducer = (state = defaultFilters, action) => {
  switch (action.type) {
    case UPDATE_FILTERS: 
      return action.filterList
    // case ADD_FILTER:
    //   return [...state, action.category]
    // case REMOVE_FILTER:
    //   oldFilters = state;
    //   newFilters = oldFilters.filter((elt) => {
    //     return (elt !== action.category)
    //   })
    //   return newFilters
    case RESET_FILTERS:
      return defaultFilters;
    default:
      return state
  }
}

export default productsReducer
