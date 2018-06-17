import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axios from '../../axios-order'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    purchasable: false,
    purchase: false,
    loading: false
  };
  
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
    .map(igKey => ingredients[igKey])
    .reduce((sum, el) => sum + el, 0);
    
    this.setState({purchasable: sum > 0})
  };
  
  addIngredientHandler = (type) => {
    const newCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients)
  };
  
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0 ) return;
    const newCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients)
  };
  
  purchaseHandler = () => {
    this.setState({purchase: true})
  };
  
  purchaseCancelHandler = () => {
    this.setState({purchase: false})
  };
  
  purchaseContinueHandler = () => {
    // alert('You continue')
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Alex',
        address: {
          street: "Test 123",
          zipCode: "123456",
          country: "ABC"
        },
        email: "adad@add.com"
      },
      deliveryMethod: "fastest"
    };

    axios.post('/orders.json', order)
      .then(r => {
        console.log(r);
        this.setState({loading: false, purchase: false})
      })
      .catch(e => {
        console.log(e);
        this.setState({loading: false, purchase: false})
      })
  };
  
  render () {
    const disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo)
      disabledInfo[key] = disabledInfo[key] <= 0

    let orderSummary = <OrderSummary
      totalPrice={this.state.totalPrice}
      purchaseContinued={this.purchaseContinueHandler}
      purchaseCancelled={this.purchaseCancelHandler}
      ingredients={this.state.ingredients}/>;

    if(this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
      <Fragment>
        <Modal show={this.state.purchase}
               modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Fragment>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)