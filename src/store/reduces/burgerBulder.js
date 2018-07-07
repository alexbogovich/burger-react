import {
  INGREDIENT_ADD,
  INGREDIENT_FETCH_FAILED,
  INGREDIENT_REMOVE,
  INGREDIENT_SET,
} from "../actions/actionTypes"

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_ADD:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }
    case INGREDIENT_REMOVE:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      }
    case INGREDIENT_SET:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
      }
    case INGREDIENT_FETCH_FAILED:
      return {
        ...state,
        error: true,
      }
    default:
      return state
  }
}