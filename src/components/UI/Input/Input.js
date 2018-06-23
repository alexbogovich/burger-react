import PropTypes from "prop-types"
import React from "react"

import classes from "./Input.module.css"

const Input = props => {
  
  let inputElement = null
  
  switch (props.elementType) {
    case ("textarea"):
      inputElement =
        <textarea className={classes.InputElement} {...props.elementConfig}
                  value={props.value}/>
      break
    
    case ("select"):
      inputElement =
        <select className={classes.InputElement}
                value={props.value}>
          {
            props.elementConfig.options.map((option, i) =>
              <option
                key={i}
                value={option.value}>
                {option.displayValue}
              </option>,
            )
          }
        </select>
      break
    
    case ("input"):
    default:
      inputElement =
        <input className={classes.InputElement} {...props.elementConfig}
               value={props.value}/>
      break
  }
  
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  elementType: PropTypes.oneOf(["input", "textarea", "select"]).isRequired,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string,
}

export default Input