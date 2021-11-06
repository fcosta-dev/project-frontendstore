import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import PageDetails from './pages/PageDetails';
import Checkout from './pages/Checkout';

class App extends Component {
  constructor(props) {
    super(props);

    // Inicia o state com um array cart que servirá para adicionar os itens do carrinho
    this.state = {
      cart: [],
    };

    // Permite que as funções possam ser lidas em todo o componente com o .this
    this.setCart = this.setCart.bind(this);
    this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
    this.updateQuant = this.updateQuant.bind(this);
  }

  componentDidMount() {
    // Se no localStorage, tiver a chave cartItems, então puxa as informações dela com a função getFromLocalStorage
    if (localStorage.cartItems) {
      this.getFromLocalStorage();
    }
  }

  // Essa função abaixo vai guardar no localStorage os items no carrinho
  // É prática de mercado guardar itens de carrinho no localStorage
  setCart(product) {
    this.setState((state) => ({ cart: [...state.cart, product] }), () => {
      // Guarda do state do ListProducts.
      const { cart } = this.state;
      // Guarda no localStorage caso o usuário abra novamente a página e seus itens ainda continuam no carrinho.
      localStorage.setItem('cartItems', JSON.stringify(cart));
    });
  }

  // Pega os dados que estão no LocalStorage e joga no carrinho
  getFromLocalStorage() {
    const previousCart = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({
      cart: previousCart,
    });
  }

  // Função usada no ProducCart onde conforme for clicando nos botões vai sendo alterado
  // id = proprio id do produto
  // bool = identificador se vai adicionar(true) ou reduzir(false)
  updateQuant(id, addOrDel) {
    this.setState((state) => ({
      cart: state.cart.map((product) => {
        // Se for Subtração/False e o elem for igual ao id então...
        if (!addOrDel && product.id === id) {
          return { ...product, quant: product.quant - 1 };
        }
        // Se for Adição/True e o elem for igual ao id então..
        if (addOrDel && product.id === id) {
          return { ...product, quant: product.quant + 1 };
        }
        // Se não tiver nenhuma opção retorna o product
        return product;
      }),
    }));
  }

  render() {
    const { cart, categories } = this.state;

    return (
      <BrowserRouter>
        {/* Chama o componente Header e passa a props com os itens no carrinho */}
        <Header cartItems={ cart } />
        <p className="cart-btn">
          <Link data-testid="shopping-cart-button" to="/cart">
            Carrinho
          </Link>
        </p>

        {/* Inicia o switch das rotas que o App vai ter */}
        <Switch>
          <Route
            exact
            path="/"
            render={ () => <Home setCart={ this.setCart } categories={ categories } /> }
          />
          <Route
            exact
            path="/checkout"
            render={ () => <Checkout cart={ cart } /> }
          />
          <Route
            path="/cart"
            render={ () => (<ShoppingCart
              cart={ cart }
              updateQuant={ this.updateQuant }
            />) }
          />
          <Route
            path="/product/:category/:id"
            // component={ PageDetails }
            render={ ({ match }) => (<PageDetails
              setCart={ this.setCart }
              match={ match }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
