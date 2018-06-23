import PropTypes from "prop-types"
import React, { Component } from "react"

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
  }
  
  orderHandler = (event) => {
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
      input.validation.valid = this.checkValidity(input.value, input.validation)
    }
    console.log(input)
    updatedOrderForm[inputIdentifier] = input
    this.setState({orderForm: updatedOrderForm})
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
      />)
    })
    
    let form = (
      <form onSubmit={this.orderHandler}>
        {inputElements}
        <Button btnType="Success">ORDER</Button>
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

export default ContactData