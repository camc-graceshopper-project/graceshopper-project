import React from 'react'
import {connect} from 'react-redux'
import {changePassword} from '../store/user'

export class PasswordResetForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password1: '',
      password2: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = evt => {
    evt.preventDefault()
    if (!this.checker()) {
      alert('Both passwords must match!!!')
    } else {
      const newPassword = this.state.password1
      this.props.changePassword(this.props.match.params.token, {
        password: newPassword
      })
      alert('Your password is updated!!!')
    }
  }

  Toggle() {
    const x = document.getElementById('myInput')
    const y = document.getElementById('myInput1')
    if (x.type === 'password') {
      x.type = 'text'
    } else {
      x.type = 'password'
    }
    if (y.type === 'password') {
      y.type = 'text'
    } else {
      y.type = 'password'
    }
  }

  checker = () => {
    const pw1 = document.getElementById('myInput')
    const pw2 = document.getElementById('myInput1')
    if (pw1.value === pw2.value) return true
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h3>Reset Your Password:</h3>
          <label>New Password: </label>
          <input
            id="myInput"
            type="password"
            name="password1"
            value={this.state.password1}
            onChange={this.handleChange}
          />
          <br />
          <label>Confirm Password: </label>
          <input
            id="myInput1"
            type="password"
            name="password2"
            value={this.state.password2}
            onChange={this.handleChange}
          />
          <br />
          <input type="checkbox" onClick={() => this.Toggle()} />show password
          <br />
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}
const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    changePassword: (token, newPassword) =>
      dispatch(changePassword(token, newPassword))
  }
}

export default connect(mapState, mapDispatch)(PasswordResetForm)
