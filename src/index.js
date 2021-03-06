import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import App from "./App"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"

import burgerBuilderReducer from "./store/reduces/burgerBulder"
import orderReducer from "./store/reduces/order"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk),
))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
registerServiceWorker()
