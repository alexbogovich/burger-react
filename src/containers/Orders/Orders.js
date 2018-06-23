import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Order from "../../components/Order/Order";

import axios from "../../axios-order"
import withErrorHandler from "../withErrorHandler/withErrorHandler";

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios.get("orders.json")
      .then(r => {
        console.log(r.data);
        const fetchOrders = [];
        for(let key in r.data) {
          fetchOrders.push({...r.data[key], id: key})
        }
        this.setState({loading: false, orders: fetchOrders})
      })
      .catch(e => {
        this.setState({loading: false})
      })
  }


  render() {
    return (
      <div>
        {this.state.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />)}
      </div>
    );
  }
}

Orders.propTypes = {};

export default withErrorHandler(Orders, axios);