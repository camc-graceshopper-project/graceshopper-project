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
import ChangeStatusForm from './components/ChangeStatusForm'
import CreateNewProductForm from './components/CreateNewProductForm'
import EditProductForm from './components/EditProductForm'
import {fetchCart} from './store/cart'
import {fetchCategories} from './store/categories'
import AddCategoryForm from './components/AddCategoryForm'
import MakeUserAdminForm from './components/MakeUserAdmin';

import AdminPanel from './components/AdminPanel'
import { AddRemoveCategoryForm } from './components/AddRemoveProductCategoryForm';
import CreateReviewForm from './components/CreateReviewForm'

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
        <Route exact path="/all-products/:page" component={AllProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/account" component={UserHome} />
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/orders/:orderId" component={SingleOrder} />
            <Route
              exact
              path="/orders/:orderId/changeStatus"
              component={ChangeStatusForm}
            />
            <Route exact path="/adminpanel" component={AdminPanel} />
            <Route
              exact
              path="/adminpanel/postproduct"
              component={CreateNewProductForm}
            />
            <Route
              exact
              path="/products/:productId/editproduct"
              component={EditProductForm}
            />
            <Route
              exact
              path="/products/:id/postreview"
              component={CreateReviewForm}
            />
            <Route exact path="/orders" component={AllOrders} />
            <Route exact path="/add-category" component={AddCategoryForm} />
            <Route exact path="/make-user-admin" component={MakeUserAdminForm} />
            <Route
              exact
              path="/products/:productId/editproduct/addRemoveCategory"
              component={AddRemoveCategoryForm}
            />
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
