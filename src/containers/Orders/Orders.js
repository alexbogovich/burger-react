import React, { Component } from "react"
import { connect } from "react-redux"

import axios from "../../axios-order"
import Order from "../../components/Order/Order"
import Spinner from "../../components/UI/Spinner/Spinner"
import { fetchOrders } from "../../store/actions"
import withErrorHandler from "../withErrorHandler/withErrorHandler"

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders()
  }
  
  render () {
    let orders = <Spinner/>
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders
          .map(order =>
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />,
          )}
        </div>
      )
    }
    return orders
  }
}

Orders.propTypes = {}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
})

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(fetchOrders()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios))