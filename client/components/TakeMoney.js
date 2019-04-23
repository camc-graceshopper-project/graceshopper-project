import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
// import {completeCheckout} from '../store/orders'


export default class TakeMoney extends React.Component {
  
  onToken = async (token) => {
    const stripeResponse = await axios.post('/api/orders/save-stripe-token', {
      amount: 500,
      token
    });
    console.log(stripeResponse);
    // const data = stripeResponse.json();
    // ? idk
    
    // fetch('/save-stripe-token', {
    //   method: 'POST',
    //   body: JSON.stringify(token),
    // }).then(response => {
    //   response.json().then(data => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
    
    
    //this.props.completeCheckout();
    
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


// const mapDispatchToProps = dispatch => {
//   return {
//     completeCheckout: () => dispatch(completeCheckout())
//   }
// }

// export default connect(null, mapDispatchToProps)(TakeMoney)

