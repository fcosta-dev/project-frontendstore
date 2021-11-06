import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    // Recebo a props cartItems que tem as informações dos produtos que estão no carrinho
    const { cartItems } = this.props;

    // Faz um reduce para pegar a quantidade de itens no carrinho
    const totalItems = cartItems.reduce((acc, curr) => acc + curr.quant, 0);

    return (
      // Título principal
      <header className="header-container">
        <div className="title-container">
          <h2>Project Frontend Online Shopp</h2>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        {/* Carrinho */}
        <Link
          to="/cart"
          data-testid="shopping-cart-size"
        >
          <div className="div-img-cart">
            <img
              className="img-cart"
              src="shopping_cart_black_24dp.svg"
              alt=""
            />
            <span
              style={ { color: 'black' } }
              className="show-qtd"
            >
              {' '}
              [
              {' '}
              { totalItems }
              {' '}
              ]
            </span>
          </div>
        </Link>

      </header>
    );
  }
}

Header.propTypes = {
  cartItems: PropTypes.arrayOf,
}.isRequired;

export default Header;
