import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
    };

    // Prepara a função handleChange para ser chamada em todo o componente pelo .this
    this.handleChange = this.handleChange.bind(this);
  }

  // Função quando é feito alguma alteração, em específico no input, é salvo o state inputSearch
  handleChange({ target: { value } }) {
    this.setState({ inputSearch: value });
  }

  render() {
    // Desestrutura a função handleSubmit que está na App.js e que veio de props da page Home
    const { handleSubmit } = this.props;
    // Desestrutura o state pegando o inputSearch
    const { inputSearch } = this.state;

    return (
      <div className="show-search-bar">
        {/* Criação da Barra de Procura de Produtos */}
        <label htmlFor="input">
          <input
            className="input-search"
            name="input"
            value={ inputSearch }
            data-testid="query-input"
            type="search"
            onChange={ this.handleChange }
            placeholder="Buscar produtos, marcas e muito mais..."
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          // Quando o evento click for acionado, é executado a função handleSubmit passando como parametro de procura o inputSearch
          onClick={ () => handleSubmit(inputSearch) }
        >
          Enviar
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
