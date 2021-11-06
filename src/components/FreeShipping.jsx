import React from 'react';
import { FcShipped } from 'react-icons/fc';

class FreeShipping extends React.Component {
  render() {
    return (
      <div data-testid="free-shipping">
        <FcShipped />
        <span>Frete grátis</span>
      </div>
    );
  }
}

export default FreeShipping;
