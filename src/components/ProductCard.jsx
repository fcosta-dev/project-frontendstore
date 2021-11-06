import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    // Recebe a props produto do componente ListProducts e desconstrói o id, title, thumbail
    // Pegamos tambem informação de shipping/frete e available quantity
    const {
      produto: { id, title, thumbnail, price,
        // Desestruturo o shipping da API que tem a função de informar se o frete é gratuito
        shipping: { free_shipping: freeShipping },
        // Desestruturo o available_quantity que informa se o produto ainda está disponível
        available_quantity: available,
      },
    } = this.props;

    const { produto } = this.props;
    const categoryId = produto.category_id;
    // Recebe a função setCart que está no App.js como props
    const { setCart } = this.props;

    // Se o tamanho do id for menor que 1 já retorna que não foi encontrado nenhum produto
    if (id.length < 1) return 'Nenhum produto encontrado';

    return (
      <div className="card-container">
        <Link
          key={ `${id} - ${title}` }
          // Faz o link to do produto com sua categoria e id
          to={ `/product/${categoryId}/${id}` }
          data-testid="product-detail-link"
        >
          <div data-testid="product" className="product-card">
            <p className="product-title">{ title }</p>
            <img src={ thumbnail } alt="{ title }" />
            {/* Adiciona no card a informação do Frete Gratis quando houver */}
            {freeShipping && (
              <p data-testid="free-shipping">
                Frete grátis
              </p>
            )}
            {/* Informa o preço do produto */}
            <p className="product-price">{` R$ ${price}`}</p>
          </div>
        </Link>
        <button
          // O evento click abaixo chama a função setCard que vai ...
          // ...adicionar o item no state do ListProducs e no localStorage.
          onClick={ () => setCart({ id, title, price, quant: 1, thumbnail, available }) }
          type="button"
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default ProductCard;
