import React from 'react'
import {Link} from 'react-router-dom'

export default class Reviews extends React.Component {
  render() {
    //console.log(this.props.singleProduct)
    return (
      <div>
        <h2>Reviews:</h2>
        {!this.props.singleProduct.reviews.length ? (
          <div>No Reviews Yet!</div>
        ) : (
          this.props.singleProduct.reviews.map(review => {
            return (
              <div key={review.id}>
                <p>Title: {review.title}</p>
                <p>Rating: {review.rating}</p>
                <p>Descripting: {review.description}</p>
              </div>
            )
          })
        )}
        <Link to={`/products/${this.props.singleProduct.id}/postreview`}>
          <button type="button">Write A Review</button>
        </Link>
      </div>
    )
  }
}
