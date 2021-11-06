import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductsReview from '../components/ProductsReview';
import BuyerReview from '../components/BuyerReview';
import PaymentMethod from '../components/PaymentMethod';

class Checkout extends Component {
  render() {
    // Recebe a props cart vinda do App.js com as informações atuais do carrinho
    const { cart } = this.props;

    return (
      <div className="screen-checkout">
        {/* Chama o componente de Revisão do carrinho */}
        <ProductsReview cart={ cart } />
        {/* Salta um espaçamento entre os componentes */}
        <br />
        {/* Chama o componente de Revisão do comprador */}
        <BuyerReview />
        {/* Salta um espaçamento entre os componentes */}
        <br />
        {/* Chama o componente de método de pagamento */}
        <PaymentMethod />

        {/* Salta um espaçamento entre os componentes */}
        <br />
        {/* Criando link para finalização da compra */}
        <div className="btn-div-finish">
          <Link
            to="/"
            onClick={ this.emptyCart }
            className="btn btn-center btn-finish"
          >
            Finalizar
          </Link>
        </div>
        <br />
      </div>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Checkout;
