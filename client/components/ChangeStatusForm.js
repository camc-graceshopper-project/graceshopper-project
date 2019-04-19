import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateOneOrder} from '../store/singleOrder'
import SingleOrder from './SingleOrder'

export class ChangeStatusForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const statusChange = this.state.status
    const singleOrder = this.props.singleOrder
    this.props.updateOneOrder(singleOrder.id, statusChange)
    this.setState({
      status: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h3>Change Status:</h3>
          <label htmlFor="status">Status:</label>
          <br />
          <input
            type="text"
            name="status"
            value={this.state.status}
            onChange={this.handleChange}
          />
          <button type="submit">Submit Changes</button>
        </div>
      </form>
    )
  }
}

const mapState = state => {
  return {
    singleOrder: state.singleOrder
  }
}

const mapDispatch = dispatch => {
  return {
    updateOneOrder: (id, update) => dispatch(updateOneOrder(id, update))
  }
}

export default connect(mapState, mapDispatch)(ChangeStatusForm)
=======
import {connect} from 'react-redux'
import {updateOneOrder} from '../store/singleOrder'


export class ChangeStatusForm extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            status: ''
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
        const statusChange = this.state.status;
        const singleOrder = this.props.singleOrder
        this.props.updateOneOrder(singleOrder.id, statusChange)
        this.setState({
            status: ''
        })

    }

    render(){

        return(
          <form onSubmit={this.handleSubmit}>
            <div>
                <h3>Change Status:</h3>
                <label htmlFor='status'>Status:</label>
                <br />
                <input
                    type='text'
                    name='status'
                    value={this.state.status}
                    onChange={this.handleChange}
                />
                <button type='submit'>Submit Changes</button>
            </div>
          </form>
        )
    }
}

const mapState = state => {

    return {
        singleOrder: state.singleOrder
    }


}

const mapDispatch = dispatch => {
    return {
    updateOneOrder: (id, update) => dispatch(updateOneOrder(id, update))
    }
}

export default connect(mapState, mapDispatch)(ChangeStatusForm)
