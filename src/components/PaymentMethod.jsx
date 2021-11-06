import React, { Component } from 'react';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);

    // Prepara a função para ser usada na classe toda
    this.handleChange = this.handleChange.bind(this);
  }

  // Função que quando for alterar algo o state do campo é alterado de imediato na state
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    // Renderização simples de input type radio simulando opção bancária
    return (
      <div className="checkout-payment-method">
        <h3>Método de pagamento</h3>
        <label htmlFor="boleto">
          Boleto
          <input
            type="radio"
            id="boleto"
            name="payment"
            value="boleto"
            // Cada vez que o usuário alterar opção, o value é colocado no state
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label htmlFor="boleto">
          Visa
          <input
            type="radio"
            id="boleto"
            name="payment"
            value="visa"
            // Cada vez que o usuário alterar opção, o value é colocado no state
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label htmlFor="boleto">
          Master Card
          <input
            type="radio"
            id="boleto"
            name="payment"
            value="masterCard"
            // Cada vez que o usuário alterar opção, o value é colocado no state
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
      </div>
    );
  }
}

export default PaymentMethod;
