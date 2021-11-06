import React from 'react';
import cityAndStates from '../cityAndStates';
import '../style/infoUser.css';

class InfoUser extends React.Component {
  constructor() {
    super();
    this.state = {
      state: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value.toUpperCase() });
  }

  render() {
    const { state: curState } = this.state;
    return (
      <form className="py-3 mt-3">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text form-span" id="name">Nome</span>
          </div>
          <input
            type="text"
            placeholder="Nome Completo"
            data-testid="checkout-fullname"
            className="form-control"
            aria-describedby="name"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text form-span" id="cpf">CPF</span>
          </div>
          <input
            type="text"
            placeholder="CPF"
            data-testid="checkout-cpf"
            className="form-control"
            aria-describedby="cpf"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text form-span" id="email">Email</span>
          </div>
          <input
            type="email"
            placeholder="Email"
            data-testid="checkout-email"
            className="form-control"
            aria-describedby="email"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text form-span" id="phone">Telefone</span>
          </div>
          <input
            type="text"
            placeholder="Telefone"
            data-testid="checkout-phone"
            className="form-control"
            aria-describedby="phone"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text form-span" id="cep">CEP</span>
          </div>
          <input
            type="text"
            placeholder="CEP"
            data-testid="checkout-cep"
            className="form-control"
            aria-describedby="cep"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text form-span" id="state">Estado</span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-describedby="state"
            list="states"
            placeholder="Estado"
            onChange={ this.handleChange }
            name="state"
            value={ curState }
          />
          <datalist id="states">
            {cityAndStates.map((state, index) => (
              <option
                key={ state.sigla + index }
                value={ state.sigla }
              >
                {state.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
              </option>
            ))}
          </datalist>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text form-span" id="city-input">Cidade</span>
          </div>
          <input
            type="text"
            placeholder="Cidade"
            className="form-control"
            aria-describedby="city-input"
            list="city"
          />
          <datalist id="city">
            {cityAndStates.filter((state) => curState === '' || state.sigla === curState)
              .map((state) => state.cidades.map((city, index) => (
                <option
                  key={ city + index }
                  value={ city }
                >
                  {city.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                </option>
              )))}
          </datalist>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text form-span" id="address">Endereco</span>
          </div>
          <input
            type="text"
            placeholder="Endereco"
            className="form-control"
            aria-describedby="address"
            data-testid="checkout-address"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span
              className="input-group-text form-span"
              id="address-add"
            >
              Complemento
            </span>
          </div>
          <input
            type="text"
            placeholder="Complemento (opcional)"
            className="form-control"
            aria-describedby="address-add"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text form-span" id="number">Número</span>
          </div>
          <input
            type="text"
            placeholder="Número"
            className="form-control"
            aria-describedby="number"
          />
        </div>
      </form>
    );
  }
}

export default InfoUser;
