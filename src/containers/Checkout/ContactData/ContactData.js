import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"

import axios from "../../../axios-order"
import Button from "../../../components/UI/Button/Button"
import Input from "../../../components/UI/Input/Input"
import Spinner from "../../../components/UI/Spinner/Spinner"

import classes from "./ContactData.module.css"

class ContactData extends Component {
  
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
        },
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          valid: false,
          touched: false,
        },
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "country",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
        },
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
        },
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
        value: "fastest",
      },
    },
    orderFormIsValid: false,
  }
  
  orderHandler        = (event) => {
    event.preventDefault()
    console.log(this.props.ingredients)
    this.setState({loading: true})
    const formData = Object.keys(this.state.orderForm)
    .reduce((acc, key) => {
      acc[key] = this.state.orderForm[key].value
      return acc
    }, {})
    
    console.log(formData)
    
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    }
    
    axios.post("/orders.json", order)
    .then(r => {
      console.log(r)
      this.setState({loading: false})
      this.props.history.push("/")
    })
    .catch(e => {
      console.log(e)
      this.setState({loading: false})
    })
    
  }
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm}
    const input            = {
      ...updatedOrderForm[inputIdentifier],
      value: event.target.value,
    }
    
    if (input.validation) {
      input.validation.touched = true
      input.validation.valid   =
        this.checkValidity(input.value, input.validation)
    }
    console.log(input)
    updatedOrderForm[inputIdentifier] = input
    
    const orderFormIsValid = Object.keys(updatedOrderForm)
    .reduce((acc, k) => {
      const v = updatedOrderForm[k].validation
      return v ? acc && v.valid : acc
    }, true)
    
    console.log("form is valid", orderFormIsValid)
    
    this.setState({
      orderForm: updatedOrderForm,
      orderFormIsValid: orderFormIsValid,
    })
  }
  
  checkValidity (value, rules) {
    let isValid = true
    
    if (rules.required) {
      isValid &= value.trim() !== ""
    }
    
    if (rules.minLength) {
      isValid &= value.trim().length >= rules.minLength
    }
    if (rules.maxLength) {
      isValid &= value.trim().length <= rules.maxLength
    }
    
    return isValid
  }
  
  render () {
    const inputElements = Object.keys(this.state.orderForm)
    .map(key => {
      const e = this.state.orderForm[key]
      return (<Input
        key={key}
        elementType={e.elementType}
        elementConfig={e.elementConfig}
        value={e.value}
        changed={(event) => this.inputChangedHandler(event, key)}
        invalid={e.validation && e.validation.touched
          ? !e.validation.valid
          : false}
      />)
    })
    
    let form = (
      <form onSubmit={this.orderHandler}>
        {inputElements}
        <Button btnType="Success"
                disabled={!this.state.orderFormIsValid}>ORDER</Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner/>
    }
    
    return (
      <div className={classes.ContactData}>
        <h4>Entry your contact data</h4>
        {form}
      </div>
    )
  }
}

ContactData.propTypes = {
  ingredients: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
  }
}

export default connect(mapStateToProps)(ContactData)