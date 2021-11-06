import React, { Component } from 'react';

class BuyerReview extends Component {
  constructor(props) {
    super(props);

    // Adicionando state inicial
    this.state = {
      email: '', // joao@email.com.br
      cpf: '', // 123.456.789-01
      fullName: '', // João do Brasil
      phone: '', // (11) 91234-5678
      cep: '', // 12345-67
      address: '', // Rua Central do Brasil, nr. 123
    };

    // Prepara a função para ser usada na classe toda
    this.handleChange = this.handleChange.bind(this);
  }

  // Função que quando for digitar algo o state do campo é alterado de imediato na state
  handleChange(event) {
    console.log(event);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    // Desconstroi o state para usar no render()
    const { email, cpf, fullName, phone, cep, address } = this.state;
    return (
      // Inicia estrutura para montagem das Informações do Comprador
      <form className="checkout-user-info">
        <h3>Informações do comprador</h3>
        <div className="buyer-inputs">
          <input
            type="text"
            placeholder="Nome Completo"
            name="fullName"
            value={ fullName }
            // Cada vez que o usuário digitar algo, roda a função handleChange e o dado é colocado no state
            onChange={ (event) => this.handleChange(event) }
            data-testid="checkout-fullname"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            // Cada vez que o usuário digitar algo, roda a função handleChange e o dado é colocado no state
            onChange={ (event) => this.handleChange(event) }
            data-testid="checkout-email"
          />
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            value={ cpf }
            // Cada vez que o usuário digitar algo, roda a função handleChange e o dado é colocado no state
            onChange={ (event) => this.handleChange(event) }
            data-testid="checkout-cpf"
          />
          <input
            type="text"
            placeholder="Telefone"
            name="phone"
            value={ phone }
            // Cada vez que o usuário digitar algo, roda a função handleChange e o dado é colocado no state
            onChange={ (event) => this.handleChange(event) }
            data-testid="checkout-phone"
          />
          <input
            type="text"
            placeholder="CEP"
            name="cep"
            value={ cep }
            // Cada vez que o usuário digitar algo, roda a função handleChange e o dado é colocado no state
            onChange={ (event) => this.handleChange(event) }
            data-testid="checkout-cep"
          />
          <input
            type="text"
            placeholder="Endereço"
            name="address"
            maxLength="50"
            value={ address }
            // Cada vez que o usuário digitar algo, roda a função handleChange e o dado é colocado no state
            onChange={ (event) => this.handleChange(event) }
            data-testid="checkout-address"
          />
        </div>
      </form>
    );
  }
}

export default BuyerReview;
