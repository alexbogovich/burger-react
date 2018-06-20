import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from "../../../components/UI/Button/Button";

import axios from '../../../axios-order'

import classes from "./ContactData.module.css"
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);

    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        address: {
          street: this.state.address.street,
          zipCode: this.state.address.postalCode
        },
        email: this.state.email
      },
      deliveryMethod: "fastest"
    };

    axios.post('/orders.json', order)
      .then(r => {
        console.log(r);
        this.setState({loading: false});
        this.props.history.push("/")
      })
      .catch(e => {
        console.log(e);
        this.setState({loading: false})
      })


  };

  render() {

    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
        <input className={classes.Input} type="text" name="email" placeholder="Email"/>
        <input className={classes.Input} type="text" name="street" placeholder="Street"/>
        <input className={classes.Input} type="text" name="postal" placeholder="Postal"/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if(this.state.loading) {
      form = <Spinner/>
    }

    return (
      <div className={classes.ContactData}>
        <h4>Entry your contact data</h4>
        {form}
      </div>
    );
  }
}

ContactData.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default ContactData;