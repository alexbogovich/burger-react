import axios from "../../axios-order"
import {
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