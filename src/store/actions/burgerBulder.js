import axios from "../../axios-order"
import {
  INGREDIENT_ADD,
  INGREDIENT_FETCH_FAILED,
  INGREDIENT_REMOVE,
  INGREDIENT_SET,
} from "./actionTypes"

export const addIngredient = ingredientName => ({
  type: INGREDIENT_ADD,
  ingredientName: ingredientName,
})

export const removeIngredient = ingredientName => ({
  type: INGREDIENT_REMOVE,
  ingredientName: ingredientName,
})

export const setIngredients = (ingredients) => ({
  type: INGREDIENT_SET,
  ingredients: ingredients,
})

export const fetchIngredientsFailed = () => ({
  type: INGREDIENT_FETCH_FAILED,
})

export const initIngredients = () => dispatch => {
  axios.get("https://react-my-burger-95879.firebaseio.com/ingredients.json")
  .then(r => dispatch(setIngredients(r.data)))
  .catch(e => dispatch(fetchIngredientsFailed()))
}