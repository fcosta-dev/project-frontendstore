import React from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';

class AddCartButton extends React.Component {
  constructor() {
    super();
    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    const { product } = this.props;
    product.quantity = product.quantity || 1;
    const list = localStorage.cartItems;
    let productList = [];
    if (list) productList = JSON.parse(list);
    productList.push(product);
    localStorage.cartItems = JSON.stringify(productList);
  }

  render() {
    const { dataTestId, product } = this.props;
    return (
      <Context.Consumer>
        {(({ cartLength, setCartLength }) => (
          <div className="d-grid gap-2 col-12 mx-auto pb-2">
            <input
              className="btn btn-success"
              type="button"
              value="Adicionar item no carrinho"
              data-testid={ dataTestId }
              onClick={ () => {
                this.addItem();
                setCartLength(product.quantity + cartLength);
              } }
            />
          </div>
        )) }
      </Context.Consumer>
    );
  }
}

AddCartButton.propTypes = {
  product: PropTypes.shape({
    quantity: PropTypes.number,
  }),
  dataTestId: PropTypes.string,
};

AddCartButton.defaultProps = {
  product: {
    quantity: 1,
  },
  dataTestId: '',
};

export default AddCartButton;
