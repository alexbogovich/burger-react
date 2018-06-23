import React, {Component} from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from "./containers/Checkout/Checkout";
import {BrowserRouter, Route} from "react-router-dom";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
