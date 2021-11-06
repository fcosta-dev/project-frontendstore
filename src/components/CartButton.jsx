import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiShoppingCart } from 'react-icons/hi';

class CartButton extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Link
        to="/cart"
        data-testid="shopping-cart-button"
        className="text-white text-decoration-none ms-auto"
      >
        <HiShoppingCart className="m-0 h2 text-white" />
        <span
          data-testid="shopping-cart-size"
        >
          {children}
        </span>
      </Link>
    );
  }
}

CartButton.propTypes = {
  children: PropTypes.number.isRequired,
};

export default CartButton;
