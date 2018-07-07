import React, { Component, Fragment } from "react"
import { connect } from "react-redux"

import axios from "../../axios-order"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Burger from "../../components/Burger/Burger"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Modal from "../../components/UI/Modal/Modal"
import Spinner from "../../components/UI/Spinner/Spinner"
import {
  addIngredient,
  initIngredients,
  removeIngredient,
} from "../../store/actions"
import withErrorHandler from "../withErrorHandler/withErrorHandler"

class BurgerBuilder extends Component {
  
  state = {
    purchase: false,
  }
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
    .map(igKey => ingredients[igKey])
    .reduce((sum, el) => sum + el, 0)
  
    return sum > 0
  }
  
  purchaseHandler = () => {
    this.setState({purchase: true})
  }
  purchaseCancelHandler = () => {
    this.setState({purchase: false})
  }
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout")
  }
  
  componentDidMount () {
    this.props.onInitIngredients()
  }
  
  render () {
    const disabledInfo = {...this.props.ingredients}
    for (let key in disabledInfo)
      disabledInfo[key] = disabledInfo[key] <= 0
    
    let orderSummary = null
  
    let burger = this.props.error ?
      <p>Ingredients can't be loaded</p>
      : <Spinner/>
    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      )
      
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
          ingredients={this.props.ingredients}/>
      )
    }
    
    return (
      <Fragment>
        <Modal show={this.state.purchase}
               modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
})

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: name => dispatch(addIngredient(name)),
  onIngredientRemoved: name => dispatch(removeIngredient(name)),
  onInitIngredients: () => dispatch(initIngredients()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios))