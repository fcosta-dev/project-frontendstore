import React from 'react';
import PropTypes from 'prop-types';
import AddCartButton from '../components/AddCartButton';
import AvaliationForm from '../components/AvaliationForm';
import { getProductsFromCategoryAndQuery, getProductById } from '../services/api';
import RenderAvaliation from '../components/RenderAvaliation';
import FreeShipping from '../components/FreeShipping';
import '../style/productDetails.css';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: { shipping: { free_shipping: false } },
      email: '',
      rating: '',
      comment: '',
      ratingsArray: [],
    };
    this.getProduct = this.getProduct.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRatingStorage = (event) => {
    event.preventDefault();
    const { email, rating, comment } = this.state;
    this.setState((lastState) => (
      { ratingsArray: [...lastState.ratingsArray, { email, rating, comment }] }));
  }

  async getProduct() {
    const { match: { params: { category, title, id } } } = this.props;
    // const result = (await getProductsFromCategoryAndQuery(category, title)).results[0];
    await getProductsFromCategoryAndQuery(category, title); // break test
    const idSearch = await getProductById(id);
    // if (result.id === id) {
    //   result.itemDescription = await idSearch.itemDescription;
    //   return this.setState({ product: result });
    // }
    // remove os comentarios e excluir a linha "await getProductsFromCategoryAndQuery(category, title);" para passar nos testes
    this.setState({ product: idSearch });
  }

  render() {
    const { product, email, rating, comment, ratingsArray } = this.state;
    const {
      title,
      price,
      thumbnail,
      itemDescription,
      shipping,
    } = product;
    return (
      <div className="container mt-3">
        <h1 className="h4 text-center" data-testid="product-detail-name">{title}</h1>
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-8">
            <img src={ thumbnail } alt={ title } className="product-details-img" />
          </div>
          <hr />
          <div className="col-12">
            <h2 className="h5 py-2">{`R$:  ${price ? price.toFixed(2) : null}`}</h2>
            {shipping.free_shipping ? <FreeShipping /> : null}
            {itemDescription ? <p>{itemDescription}</p> : null}
          </div>
        </div>
        <AddCartButton product={ product } dataTestId="product-detail-add-to-cart" />
        <hr />
        <AvaliationForm
          handleChange={ this.handleChange }
          handleClick={ this.handleRatingStorage }
          email={ email }
          rating={ rating }
          comment={ comment }
        />
        <hr />
        {ratingsArray.map((user, index) => (
          <RenderAvaliation
            rating={ user.rating }
            key={ user.email + index }
            storedEmail={ user.email }
            storedComment={ user.comment }
          />))}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  }).isRequired,
};

export default ProductDetails;
