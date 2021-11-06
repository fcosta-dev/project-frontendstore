import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';
import CartButton from './CartButton';
import logo from '../img/react-logo.png';

class Header extends React.Component {
  constructor() {
    super();
    this.renderLinks = this.renderLinks.bind(this);
  }

  renderLinks(cartLength) {
    return (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/about">Sobre</Link>
          </li>
        </ul>
        <CartButton>{cartLength}</CartButton>
      </div>
    );
  }

  render() {
    return (
      <Context.Consumer>
        {({ cartLength }) => (
          <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid container">
                <Link to="/" className="d-flex align-items-center text-decoration-none">
                  <img src={ logo } width="40px" alt="site logo" />
                  <h4 className="m-0 ms-2 me-5 text-white">Store</h4>
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                {this.renderLinks(cartLength)}
              </div>
            </nav>
          </header>
        )}
      </Context.Consumer>
    );
  }
}

export default Header;
