import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {completeCheckout} from '../store/orders'
import {connect} from 'react-redux'


export class TakeMoney extends React.Component {
  
  onToken = async (token) => {
    
    let amount = this.props.amount;
    
    const stripeResponse = await axios.post('/api/orders/save-stripe-token', {
      amount: amount,
      token
    });

    const transactionInfo = stripeResponse.data;
    const email = transactionInfo.billing_details.name;
    const transactionAmount = transactionInfo.amount;
    
    this.props.completeCheckout(transactionAmount, email);
    
  }
  
  
  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_UE56Dh7aaO5b2AR5HuvEQBfS00URoSGOiy"
      />
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    completeCheckout: (amount, email) => dispatch(completeCheckout(amount, email))
  }
}

export default connect(null, mapDispatchToProps)(TakeMoney)

