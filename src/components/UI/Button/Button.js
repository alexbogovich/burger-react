import PropTypes from "prop-types"
import React from "react"

import classes from "./Button.module.css"

const button = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}
  >{props.children}</button>
);

button.propTypes = {
  btnType: PropTypes.oneOf(["Danger", "Success"]).isRequired,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
};

export default button