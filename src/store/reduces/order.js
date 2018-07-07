import {
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_INIT,
} from "../actions/actionTypes"

const initState = {
  orders: [],
  loading: false,
  purchased: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      }
    case PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      }
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      }
    case PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      }
    case PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      }
    default:
      return state
  }
}