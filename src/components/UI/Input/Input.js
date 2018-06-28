import PropTypes from "prop-types"
import React from "react"

import classes from "./Input.module.css"

const Input = props => {
  
  const inputClasses = [classes.InputElement]
  let inputElement   = null
  
  if (props.invalid) {
    inputClasses.push(classes.Invalid)
  }
  
  switch (props.elementType) {
    case ("textarea"):
      inputElement =
        <textarea className={inputClasses.join(" ")}
                  {...props.elementConfig}
                  onChange={props.changed}
                  value={props.value}/>
      break
    
    case ("select"):
      inputElement =
        <select className={inputClasses.join(" ")}
                onChange={props.changed}
                value={props.value}>
          {props.elementConfig.options.map((option, i) =>
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
        <input className={inputClasses.join(" ")}
               {...props.elementConfig}
               onChange={props.changed}
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
  changed: PropTypes.func,
  value: PropTypes.string,
  invalid: PropTypes.bool,
}

export default Input