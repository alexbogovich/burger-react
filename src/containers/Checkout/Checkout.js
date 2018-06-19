import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {

  contants = ["salad", "meat", "cheese", "bacon"];

  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const newIngs = {};
    for (let entry of query.entries()) {
      console.log(entry);
      if(this.contants.includes(entry[0])) {
        newIngs[entry[0]] = +entry[1]
      }
    }
    this.setState({ingredients: {...newIngs}})
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data")
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}/>
      </div>
    );
  }
}

export default Checkout;
