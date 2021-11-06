import React from 'react';
import PropTypes from 'prop-types';
import FreeShipping from './FreeShipping';
import '../style/productCard.css';

class ProductCard extends React.Component {
  render() {
    const { product: {
      thumbnail,
      title,
      price,
      shipping: { free_shipping: freeShipping } } } = this.props;
    return (
      <div data-testid="product" className="row justify-content-between">
        <div className="col-3 py-2">
          <img
            src={ thumbnail }
            alt="imagem do produto"
            className="product-img"
          />
        </div>
        <div className="col-8 py-2 overflow-hidden">
          <h1 className="h6" data-testid="shopping-cart-product-name">{ title }</h1>
          <h2 className="h5">{`R$  ${price.toFixed(2)}`}</h2>
          { freeShipping ? <FreeShipping /> : null }
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductCard;
