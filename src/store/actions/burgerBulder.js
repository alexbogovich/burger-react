import { INGREDIENT_ADD, INGREDIENT_REMOVE } from "./actionTypes"

export const addIngredident = ingredientName => ({
  type: INGREDIENT_ADD,
  ingredientName: ingredientName,
})

export const removeIngredident = ingredientName => ({
  type: INGREDIENT_REMOVE,
  ingredientName: ingredientName,
})