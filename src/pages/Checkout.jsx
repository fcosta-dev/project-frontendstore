import React from 'react';
import ProductCard from '../components/ProductCard';
import InfoUser from '../components/InfoUser';
import '../style/checkout.css';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      itens: [],
      totalPrice: 0.00,
    };
  }

  componentDidMount() {
    this.pegarCarrinho();
  }

  pegarCarrinho = async () => {
    const itens = await JSON.parse(localStorage.getItem('cartItems'));
    let totalPrice = 0.00;
    itens.forEach(({ price, quantity }) => {
      totalPrice += price * quantity;
    });
    this.setState({ itens, isLoading: false, totalPrice });
  }

  renderItens() {
    const { itens, totalPrice } = this.state;
    return (
      <div className="container my-3">
        <h1 className="h2 py-2">Revise seus produtos</h1>
        <div className="row border border-secondary rounded container-border">
          {itens.map((item) => (
            <div
              key={ item.id }
              className="rounded product-border product-card bg-light"
            >
              <ProductCard product={ item } />
              <h4 className="h5">{`Quantidade: ${item.quantity}`}</h4>
            </div>
          ))}
        </div>
        <hr />
        <h3 className="py-3">{`Total: R$ ${totalPrice.toFixed(2)}`}</h3>
        <hr />
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="container">
        <div>
          { isLoading ? null : this.renderItens() }
        </div>
        <InfoUser />
      </div>
    );
  }
}

export default Checkout;
