import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Cart} from './components'
import {me} from './store'
import AllProducts from './components/AllProducts'
import SingleOrder from './components/SingleOrder'
import AllOrders from './components/AllOrders'
import SingleProduct from './components/SingleProduct'
import {fetchCategories} from './store/categories'
import {fetchCart} from './store/cart'
import ChangeStatusForm from './components/ChangeStatusForm'
import AddCategoryForm from './components/AddCategoryForm'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchCategories()
    this.props.fetchCart()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route path="/all-products/:page" component={AllProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path ="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/account" component={UserHome} />
            <Route exact path="/orders/:orderId" component={SingleOrder} />
            <Route
              exact
              path="/orders/:orderId/changeStatus"
              component={ChangeStatusForm}
            />
            <Route path="/orders" component={AllOrders} />
            <Route exact path="/add-category" component={AddCategoryForm} />

          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCart: () => dispatch(fetchCart())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
