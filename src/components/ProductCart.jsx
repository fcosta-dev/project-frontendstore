import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCart extends Component {
  render() {
    // Recebe a props e a desconstroi
    const { product: { title, quant, id, price, available, thumbnail } } = this.props;
    // Recebo a props com a função updateQuant do componente ShoppingCart
    const { updateQuant } = this.props;

    // Verifico o tamanho e quantidade da quantidade
    const checkLength = quant <= 0 ? null : true;
    const checkQuant = quant >= available;

    return (
      <div className="cart-item">
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-name">{title}</p>
        <div className="quant-btns">
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ () => updateQuant(id, true) }
            // Se o item não tiver disponibilidade de quantidade então desativa o botão
            disabled={ checkQuant }
          >
            +
          </button>
          <span data-testid="shopping-cart-product-quantity">{ quant }</span>
          <button
            type="button"
            onClick={ () => updateQuant(id, false) }
            data-testid="product-decrease-quantity"
            // Se a quantidade for null então desativa o botão por indisponibilidade de item
            disabled={ !checkLength }
          >
            -
          </button>
          {/* Adicionando price para cada item e realizando multiplicação devida */}
          <span>
            {'   '}
            R$
            {' '}
            { (quant * price).toFixed(2) }
          </span>
        </div>
      </div>
    );
  }
}

ProductCart.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    quant: PropTypes.number,
    id: PropTypes.string,
    price: PropTypes.number,
    available: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
  updateQuant: PropTypes.func.isRequired,
};

export default ProductCart;
