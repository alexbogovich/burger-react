import React, { Component } from "react"
import { connect } from "react-redux"
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"
import { auth } from "../../store/actions"

import classes from "./Auth.module.css"

class Auth extends Component {
  
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
        },
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          valid: false,
          touched: false,
        },
      },
    },
    authFormIsValid: false,
  }
  
  checkValidity = (value, rules) => {
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
  
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {...this.state.controls}
    const input = {
      ...updatedOrderForm[inputIdentifier],
      value: event.target.value,
    }
    
    if (input.validation) {
      input.validation.touched = true
      input.validation.valid =
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
      controls: updatedOrderForm,
      authFormIsValid: orderFormIsValid,
    })
  }
  submitHandler = (event) => {
    event.preventDefault()
    this.props
    .onAuth(this.state.controls.email.value, this.state.controls.password.value)
  }
  
  render () {
    const inputElements = Object.keys(this.state.controls)
    .map(key => {
      const e = this.state.controls[key]
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
    
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {inputElements}
          <Button btnType="Success"
                  disabled={!this.state.authFormIsValid}>SUBMIT</Button>
        </form>
      </div>
    )
  }
}

//const mapStateToProps = state => ({
//  ingredients: state.burgerBuilder.ingredients,
//  totalPrice: state.burgerBuilder.totalPrice,
//  error: state.burgerBuilder.error,
//})

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(auth(email, password)),
})

export default connect(null, mapDispatchToProps)(Auth)