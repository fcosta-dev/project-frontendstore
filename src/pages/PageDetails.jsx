import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';

class PageDetails extends React.Component {
  constructor(props) {
    super(props);

    // Com a props recebida do constructor (match/history/location) pego a match->params e desconstruo para pegar o id
    const { id } = props.match.params;

    this.state = {
      product: [],
      productID: id, // Guardo no state o id recebido pela props do constructor
    };

    // Permite o uso das funções abaixo para serem utilizadas em toda a classe com o .this
    this.getProductById = this.getProductById.bind(this);
    // this.testFun = this.testFun.bind(this);
  }

  componentDidMount() {
    this.getProductById();
  }

  async getProductById() {
    // Desconstruo o state para pegar o productID
    const { productID } = this.state;
    // A variável response irá guardar o fetch de procura pelo ID do produto
    const response = await fetch(`https://api.mercadolibre.com/items/${productID}`);
    const selectedProduct = await response.json();
    this.setState({
      product: selectedProduct,
    });
  }

  render() {
    // setCart recebido pela props está no App.js
    const { setCart } = this.props;
    const { product } = this.state;
    const { title, thumbnail, price, id, available_quantity: available } = product;
    return (
      <div className="detail-container">
        <p data-testid="product-detail-name">{title}</p>
        <img src={ thumbnail } alt={ title } />
        <p>{ `R$ ${price}`}</p>
        <p>{ `Disponível: ${available}` }</p>
        <button
          // Ao acionar o evento onClick é passado à função setCart os parametros abaixo
          onClick={ () => setCart({ id, title, price, quant: 1, thumbnail, available }) }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <Form />
      </div>
    );
  }
}

PageDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
}.isRequired;

export default PageDetails;
