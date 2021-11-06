import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductsReview extends Component {
  render() {
    // Recebe a props cart de carrinho do componente Checkout
    const { cart } = this.props;
    // Valor inicial do reduce para fazer início da somatória
    const initialValue = 0;

    return (
      <div className="checkout-cart">
        <h3>Revise seus produtos</h3>

        {/* Percorre a props cart com o map listando os produtos na tela */}
        {cart.map((product) => (
          <div className="cart-item" key={ product.id }>
            <img src={ product.thumbnail } alt="product" />
            <p>{product.title}</p>
            <p>
              { ' ' }
              R$
              { ' ' }
              {(product.price * product.quant).toFixed(2)}
            </p>
            <p>
              Qtd:
              {' '}
              {product.quant}
            </p>
          </div>
        ))}

        <p>
          Valor total do carrinho:
          <span style={ { fontWeight: 'bold' } }>
            { ' ' }
            R$
            { ' ' }
            {/* Uso o reduce para pegar o valor total do preço do carrinho */}
            {cart.reduce((a, b) => {
              a += b.price * b.quant;
              return a;
            }, initialValue).toFixed(2)}
          </span>
        </p>
      </div>
    );
  }
}

ProductsReview.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductsReview;
