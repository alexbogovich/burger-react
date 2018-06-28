import React, { Component } from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"
import CheckoutSummary
  from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
  
  constants = ["salad", "meat", "cheese", "bacon"]
  
  checkoutCancelHandler = () => {
    this.props.history.goBack()
  }
  
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data")
  }
  
  render () {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCanceled={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}/>
        <Route path={this.props.match.path + "/contact-data"}
               component={ContactData}/>}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)
