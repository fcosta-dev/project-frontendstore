import React from 'react';
import PropTypes from 'prop-types';

class RenderAvaliation extends React.Component {
  render() {
    const { storedEmail, storedComment, rating } = this.props;
    return (
      <div className="row justify-content-start">
        <div className="col-9">
          <h1 className="h3">
            {storedEmail}
          </h1>
        </div>
        <div className="col-2">
          <h2 className="h4">
            {rating}
          </h2>
        </div>
        <div className="col-12">
          <p>
            {storedComment}
          </p>
        </div>
      </div>
    );
  }
}

RenderAvaliation.propTypes = {
  storedComment: PropTypes.string.isRequired,
  storedEmail: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};

export default RenderAvaliation;
