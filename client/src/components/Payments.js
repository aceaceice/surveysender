import React from "react";
import StripeCheckout from "react-stripe-checkout";
import * as actions from "../actions";
import { connect } from "react-redux";
class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="Pay"
        description="5$ charge"
        amount={499}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add credits</button>
      </StripeCheckout>
    );
  }
}
export default connect(null, actions)(Payments);
