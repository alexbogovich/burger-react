import axios from "../../axios-order"
import {
  FETCH_ORDER_FAIL,
  FETCH_ORDER_START,
  FETCH_ORDER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_INIT,
} from "./actionTypes"

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData,
})

export const purchaseBurgerError = error => ({
  type: PURCHASE_BURGER_FAIL,
  error: error,
})

export const purchaseBurgerStart = () => ({
  type: PURCHASE_BURGER_START,
})

export const purchaseBurger = orderData => dispatch => {
  dispatch(purchaseBurgerStart())
  axios.post("/orders.json", orderData)
  .then(r => {
    console.log(r.data)
    dispatch(purchaseBurgerSuccess(r.data.name, orderData))
  })
  .catch(e => {
    dispatch(purchaseBurgerError(e))
  })
}

export const purchaseInit = () => ({
  type: PURCHASE_INIT,
})

const fetchOrdersSuccess = orders => ({
  type: FETCH_ORDER_SUCCESS,
  orders: orders,
})

const fetchOrdersFail = err => ({
  type: FETCH_ORDER_FAIL,
  error: err,
})

const fetchOrdersStart = () => ({
  type: FETCH_ORDER_START,
})

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStart())
  
  axios.get("orders.json")
  .then(r => {
    console.log(r.data)
    const fetchOrders = Object.keys(r.data)
    .map(key => ({...r.data[key], id: key}))
    dispatch(fetchOrdersSuccess(fetchOrders))
  })
  .catch(e => {
    dispatch(fetchOrdersFail(e))
  })
}