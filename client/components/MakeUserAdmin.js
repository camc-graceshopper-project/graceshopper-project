import React from 'react'
import axios from 'axios'

import './MakeUserAdmin.css'

export default class MakeUserAdminForm extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            email: ''
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
        axios.put('/api/users/makeAdmin', this.state)
        this.setState({
            email: ''
        })

    }

    render(){

        return(
            <div id="make-admin-page-container">
          <form onSubmit={this.handleSubmit}>
            <div>
                <h2>Make User An Admin</h2>

                <label htmlFor='email'>Enter User Email:</label>
                <br />
                <input
                    type='text'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                <button id="make-admin-button" type='submit'>Submit</button>
            </div>
          </form>
          </div>
        )
    }
}
