import React from 'react';
import PropTypes from 'prop-types';

import classes from "./Order.module.css"

const order = (props) => {

  console.log(props.ingredients);

  const ingredients = Object.keys(props.ingredients)
    .map(key => (
      <span key={key}
        style={{
         textTransform: 'capitalize',
         display: 'inline-block',
         margin: '0 8px',
         border: '1px solid #ccc',
         padding: '5px'
        }}
      >
        {key} ({props.ingredients[key]})
      </span>
    ));

  console.log(ingredients);

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients} </p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
};

order.propTypes = {};

export default order;