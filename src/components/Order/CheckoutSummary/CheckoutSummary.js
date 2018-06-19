import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import PropTypes from 'prop-types';
import classes from "./CheckoutSummary.module.css"

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We home it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCanceled}>Cancel</Button>
      <Button btnType="Success" clicked={props.checkoutContinue}>Continue</Button>
    </div>
  );
};

checkoutSummary.propTypes = {
  checkoutCanceled: PropTypes.func.isRequired,
  checkoutContinue: PropTypes.func.isRequired
};

export default checkoutSummary;
