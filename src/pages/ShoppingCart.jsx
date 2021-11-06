import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductCart from '../components/ProductCart';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    // Permite o uso das funções abaixo para serem utilizadas em toda a classe com o .this
    this.renderList = this.renderList.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderIsEmpty = this.renderEmpty.bind(this);
  }

  // a renderList será utilizada apenas no renderContent, sua criação foi com o intuito de não tornar muito verboso o render()
  renderList() {
    // Recebe a props do App.js que está na Route de path /cart
    // É recebido a props da função updateQuant e o cart com os itens no carrinho
    const { cart, updateQuant } = this.props;
    // Percorro o cart com o map aproveitando o elemento product e o index
    return cart.map((product, index) => (
      // Executo o componente ProductCart para cada Cart encontrado
      // Passo a função updateQuant como props para a ProductCart
      <ProductCart
        updateQuant={ updateQuant }
        key={ `${product.title} - ${index}` }
        product={ product }
      />
    ));
  }

  renderContent() {
    // Recebe a props cart com os itens do carrinho
    const { cart } = this.props;
    // Valor inicial do reduce para fazer início da somatória
    const initialValue = 0;

    return (
      <div className="checkout">
        <h2>Checkout</h2>
        <div>
          {/* Chama a função renderList que está dentro da classe */}
          { this.renderList() }
        </div>
        <p>
          Valor total do carrinho:
          {/* Coloca em negrito o valor total do carrinho */}
          <span style={ { fontWeight: 'bold' } }>
            { ' ' }
            R$
            { ' ' }
            {/* Faz um reduce no cart para totalizar carrinho */}
            {cart.reduce((a, b) => {
              a += b.price * b.quant;
              return a;
            }, initialValue).toFixed(2)}
          </span>
        </p>
        {/* Cria o link abaixo para Fechar Carrinho e ir para a finalização da compra */}
        <Link
          to="/checkout"
          data-testid="checkout-products"
          className="btn"
        >
          Fechar Carrinho
        </Link>
      </div>
    );
  }

  // Essa opção abaixo irá renderizar caso o carrinho esteja vazio, a checagem vai ser usando o length do cart
  renderEmpty() {
    return (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
  }

  render() {
    const { cart } = this.props;

    return (
      <div>
        {/* Se a quantidade do carrinho for menor que 1, então renderiza o vazio... */}
        {/* ... caso não, renderiza normalmente */}
        { cart.length < 1 ? this.renderEmpty() : this.renderContent() }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.arrayOf,
  updateQuant: PropTypes.func.isRequired,
}.isRequired;

export default ShoppingCart;
