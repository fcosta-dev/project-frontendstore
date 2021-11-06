import React, { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Context from './Context';
import Search from './pages/Search';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Header from './components/Header';

function getCartLength() {
  const { cartItems } = localStorage;
  let result = 0;
  if (cartItems) {
    result = JSON.parse(cartItems).reduce((acc, cur) => (acc + cur.quantity), 0);
  }
  return result;
}

function App() {
  const [cartLength, setCartLength] = useState(getCartLength());
  return (
    <Context.Provider value={ { cartLength, setCartLength } }>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route exact path="/cart" component={ Cart } />
          <Route
            exact
            path="/product/:category/:title/:id"
            component={ ProductDetails }
          />
          <Route exact path="/checkout" component={ Checkout } />
          <Route exact path="/about" component={ About } />
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
