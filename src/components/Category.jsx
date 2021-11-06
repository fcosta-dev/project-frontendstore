import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Este componente é chamado pela Home, para listar as categorias
class Category extends Component {
  render() {
    const { category: { name, id }, onChange } = this.props;
    return (
      // Foi escolhido o input option para que o usuário escolha apenas uma opção de categoria
      <label htmlFor={ name }>
        <input
          data-testid="category"
          type="radio"
          value={ id }
          id={ name }
          onChange={ onChange }
          name="category"
        />
        { name }
      </label>
    );
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Category;
