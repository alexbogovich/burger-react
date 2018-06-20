import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

  constants = ["salad", "meat", "cheese", "bacon"];

  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    price: 0.0
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let entry of query.entries()) {
      console.log(entry);
      if(this.constants.includes(entry[0])) {
        ingredients[entry[0]] = +entry[1]
      }
    }
    const price = query.get("price");
    this.setState({ingredients: {...ingredients}, price: price})
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
        <Route path={this.props.match.path + "/contact-data"} render={() => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...this.props}/>}/>
      </div>
    );
  }
}

export default Checkout;
