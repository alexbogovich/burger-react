import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router-dom"
import CheckoutSummary
  from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
  checkoutCancelHandler = () => this.props.history.goBack()
  
  checkoutContinueHandler = () =>
    this.props.history.replace("/checkout/contact-data")
  
  render () {
    let summary = <Redirect to="/"/>
    if (this.props.ingredients && !this.props.purchased) {
      summary = (
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
    return summary
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
})

export default connect(mapStateToProps)(Checkout)
