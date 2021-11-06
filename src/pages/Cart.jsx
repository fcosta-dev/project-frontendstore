import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Context from '../Context';
import '../style/cart.css';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      totalPrice: 0,
    };
    this.getCartItems = this.getCartItems.bind(this);
    this.productCard = this.productCard.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateGlobal = this.updateGlobal.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    const { cartItems } = localStorage;
    if (cartItems) this.setState({ cart: JSON.parse(cartItems) });
    this.getTotal();
  }

  getTotal() {
    const cart = JSON.parse(localStorage.cartItems);
    let totalPrice = 0;
    cart.forEach(({ price, quantity }) => {
      totalPrice += price * quantity;
    });
    this.setState({ totalPrice });
  }

  removeAllItems(globalChanger) {
    localStorage.cartItems = '[]';
    this.getCartItems();
    this.updateGlobal(globalChanger);
  }

  removeItem({ target: { id } }, globalChanger) {
    const cartList = JSON.parse(localStorage.cartItems);
    const cartListUpdate = cartList.reduce((acc, cur) => (
      cur.id === id ? acc : [...acc, cur]), []);
    localStorage.cartItems = JSON.stringify(cartListUpdate);
    this.getCartItems();
    this.updateGlobal(globalChanger);
  }

  changeQuantity({ target: { name, id } }, globalChanger) {
    const cartList = JSON.parse(localStorage.cartItems);
    const cartListUpdate = cartList.map((product) => {
      if (product.id === id) {
        product.quantity = name === 'add-item' ? product.quantity + 1
          : product.quantity - 1;
      }
      return product;
    });
    localStorage.cartItems = JSON.stringify(cartListUpdate);
    this.getCartItems();
    this.updateGlobal(globalChanger);
  }

  updateGlobal(setCartLength) {
    const { cartItems } = localStorage;
    let result = 0;
    if (cartItems) {
      result = JSON.parse(cartItems).reduce((acc, cur) => (acc + cur.quantity), 0);
    }
    setCartLength(result);
  }

  productCard(product, index, globalChanger) {
    const { id, title, quantity, available_quantity: avaliable } = product;
    return (
      <div
        key={ `${title}-${index}` }
        className="rounded product-border product-card bg-light"
      >
        <ProductCard product={ product } />
        <div className="row justify-content-end">
          <input
            id={ id }
            type="button"
            value="+"
            name="add-item"
            onClick={ (event) => {
              this.changeQuantity(event, globalChanger);
            } }
            data-testid="product-increase-quantity"
            disabled={ avaliable <= quantity }
            className="btn btn-success btn-sm col-2 col-lg-1 fw-bold"
          />
          <span
            className="col-lg-1 col-2 text-center negative-margin fw-bold"
            data-testid="shopping-cart-product-quantity"
          >
            {quantity}
          </span>
          <input
            id={ id }
            type="button"
            value="-"
            name="remove-item"
            onClick={ (event) => {
              this.changeQuantity(event, globalChanger);
            } }
            data-testid="product-decrease-quantity"
            disabled={ quantity === 0 }
            className="btn btn-warning btn-sm col-2 col-lg-1 me-3 fw-bold"
          />
          <input
            id={ id }
            type="button"
            value="X"
            onClick={ (event) => {
              this.removeItem(event, globalChanger);
            } }
            className="btn btn-danger btn-sm col-2 col-lg-1 mx-3 fw-bold"
          />
        </div>
      </div>
    );
  }

  render() {
    const { cart, totalPrice } = this.state;
    return (
      <Context.Consumer>
        {({ setCartLength }) => (
          <section className="pt-3 container">
            <h1 className="h3">{`Carrinho (${cart.length})`}</h1>
            <hr />
            {cart.length === 0
              ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              : (
                <div>
                  <div className="row border border-secondary rounded container-border">
                    {cart.map((product, index) => (
                      this.productCard(product, index, setCartLength)))}
                  </div>
                  <hr />
                  <h4>{`R$: ${totalPrice.toFixed(2)}`}</h4>
                  <hr />
                  <div className="d-flex justify-content-around pb-3 mb-3">
                    <Link
                      to="/checkout"
                      data-testid="checkout-products"
                      className="col-4"
                    >
                      <button
                        type="button"
                        className="btn btn-success col-12"
                      >
                        Finalizar Compra
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={ () => {
                        this.removeAllItems(setCartLength);
                      } }
                      className="btn btn-danger col-4"
                    >
                      Esvaziar Carrinho
                    </button>
                  </div>
                </div>
              )}
          </section>
        ) }
      </Context.Consumer>
    );
  }
}

export default Cart;
