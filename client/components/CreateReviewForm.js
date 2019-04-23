import React from 'react'
import {connect} from 'react-redux'
import {addNewReview} from '../store/reviews'

export class CreateReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 1,
      title: '',
      description: '',
      productId: this.props.match.params.id,
      userId: this.props.user.id
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const newReview = this.state
    this.props.addNewReview(this.props.match.params.id, newReview)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h2>Leave A Review: </h2>
          <label>Rating: </label>
          <br />
          <input
            type="integer"
            name="rating"
            value={this.state.rating}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <div>
          <label>Title: </label>
          <br />
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <div>
          <label>Description: </label>
          <br />
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapState = state => ({
  reviews: state.reviews,
  user: state.user
})
const mapDispatch = dispatch => {
  return {
    addNewReview: (id, newReview) => dispatch(addNewReview(id, newReview))
  }
}

export default connect(mapState, mapDispatch)(CreateReviewForm)
