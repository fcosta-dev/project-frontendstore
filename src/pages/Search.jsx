import React from 'react';
import { Link } from 'react-router-dom';
import AddCartButton from '../components/AddCartButton';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../style/search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: '',
      products: [],
      isLoading: true,
      isLoadingProducts: false,
      inputSearch: '',
    };
  }

  componentDidMount() {
    this.pegarCategorias();
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  pegarCategorias = async () => {
    const categories = await getCategories();
    this.setState({ categories, isLoading: false });
  }

  getProduct = async (event) => {
    if (event) event.preventDefault();
    this.setState({ isLoadingProducts: true });
    const { inputSearch, category } = this.state;
    const products = await getProductsFromCategoryAndQuery(category, inputSearch);
    this.setState({ products: products.results, isLoadingProducts: false });
  }

  handleClick = async (event) => {
    this.setState({ [event.target.name]: event.target.id });
    await event.preventDefault();
    this.getProduct();
  }

  renderCategories() {
    const { categories } = this.state;
    return (
      <div className="btn-group dropdown-button">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Categoria
        </button>
        <ul className="dropdown-menu category-dropdown">
          {categories.map((cat) => (
            <li key={ cat.id }>
              <input
                id={ cat.id }
                className="dropdown-item"
                data-testid="category"
                name="category"
                onClick={ this.handleClick }
                value={ cat.name }
                type="button"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderProducts = () => {
    const { products } = this.state;
    return (
      <div className="row border border-secondary rounded product-container-border">
        {products.map((product) => {
          const {
            id,
            title: name,
            category_id: cat,
          } = product;
          return (
            <div
              key={ id }
              className="rounded product-border product-card bg-light"
            >
              <Link
                to={ `/product/${cat}/${name.replace('%', '').replace('/', '')}/${id}` }
                data-testid="product-detail-link"
                className="text-decoration-none text-dark"
              >
                <ProductCard product={ product } />
              </Link>
              <AddCartButton product={ product } dataTestId="product-add-to-cart" />
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { isLoading, inputSearch, isLoadingProducts, products } = this.state;
    return (
      <div className="container my-4">
        <div className="row mb-3">
          <p className="col-xs-12 col-lg-6 m-0 my-1" data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <div className="col-xs-12 col-lg-6" role="form">
            <form className="input-group" onSubmit={ this.getProduct }>
              <input
                type="text"
                placeholder="Buscar produtos"
                name="inputSearch"
                value={ inputSearch }
                onChange={ this.handleChange }
                data-testid="query-input"
                className="form-control"
              />
              <button
                type="button"
                data-testid="query-button"
                onClick={ this.getProduct }
                className="btn btn-primary btn-outline-secondary text-dark"
              >
                Pesquisar
              </button>
            </form>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-xs-12 col-lg-2 category-container">
            {isLoading ? null : this.renderCategories()}
            <h6 className="pt-3">Outros filtros</h6>
            <p>(not working)</p>
            <label htmlFor="free-shipping" className="pt-1">
              Frete gratis
              <input type="checkbox" id="free-shipping" className="ms-1" />
            </label>
            <h1 className="text-center pe-3 point">.</h1>
            <h1 className="text-center pe-3 point">.</h1>
            <h1 className="text-center pe-3 point">.</h1>
            <hr className="hr-pos-filters" />
          </div>
          <div className="col-xs-12 col-lg-9 pt-3">
            {isLoadingProducts || products.length === 0 ? null : this.renderProducts()}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
