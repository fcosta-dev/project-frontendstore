import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Category from '../components/Category';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import SearchBar from '../components/SearchBar';
import '../App.css';
import ListProducts from '../components/ListProducts';

class Home extends Component {
  constructor(props) {
    super(props);

    // Setando os states iniciais
    this.state = {
      // Guarda a categoria
      category: '',
      // State que vai ter o array de categorias para ser escolhido
      listCategories: [],
      // State com o array de produtos
      products: [],
    };

    // Prepara as funções para serem utilizadas em todo o componente
    this.updateCategories = this.updateCategories.bind(this);
    this.updateListProducts = this.updateListProducts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
  }

  // Depois do componente renderizar, é executado essa função
  componentDidMount() {
    // Chama a função updateCategories quando o componente termina de ser renderizado
    this.updateCategories();
  }

  // inputSearch passa como parametro vazio pois ele é necessário na busca da API
  // inputSearch é o input de procura da SearchBar
  async handleSubmit(inputSearch = '') {
    const { category } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(category, inputSearch);
    this.updateListProducts(results);
  }

  // Tem a função de que cada alteração da categoria, ou seja, cada vez que o usuário clicar em uma opção de categoria, é executado o submit automaticamente
  onChangeCategory({ target: { value } }) {
    this.setState({ category: value }, () => {
      // Função que irá executar a procura
      this.handleSubmit();
    });
  }

  // É chamada no handleSubmit
  updateListProducts(products) {
    this.setState({ products });
  }

  // que está sendo chamada no componentDidMount que pega as categorias e joga no array listCategories que está no State.
  async updateCategories() {
    const listCategories = await getCategories();
    this.setState({ listCategories });
  }

  render() {
    // Desestrutura o state pegando o listCategories e products
    const { listCategories, products } = this.state;
    // Recebe a props com a função setCart que está no App.js
    const { setCart } = this.props;

    return (
      <section className="main-content">
        <div className="list-category">
          <h4>Categorias:</h4>
          { /* Lista as categorias, e chama o componente Category... */}
          {/* ...a cada categoria encontrada */}
          {listCategories.map((categoria) => (
            <Category
              key={ categoria.name }
              category={ categoria }
              onChange={ this.onChangeCategory }
            />
          ))}
        </div>
        <section className="products-container">
          {/* Executa o componente SearchBar aparecendo na section da... */}
          {/* ...listagem de produtos */}
          <SearchBar handleSubmit={ this.handleSubmit } />
          {/* Chama o componente ListProducts chamando os produtos */}
          <ListProducts setCart={ setCart } products={ products } />
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  setCart: PropTypes.func.isRequired,
};

export default Home;
