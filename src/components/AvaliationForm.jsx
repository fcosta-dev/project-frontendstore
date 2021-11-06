import React from 'react';
import PropTypes from 'prop-types';
import '../style/avaliationForm.css';

class AvaliationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: '0',
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  renderTextarea = (comment, handleChange) => (
    <textarea
      className="form-control"
      id="comment-area"
      name="comment"
      value={ comment }
      onChange={ handleChange }
      data-testid="product-detail-evaluation"
    />
  );

  render() {
    const { rating } = this.state;
    const { handleClick, handleChange, email, comment } = this.props;
    return (
      <form>
        <h5>Deixe uma avaliação no produto</h5>
        <div className="row justify-content-around pt-3 pb-2">
          <div className="col-sm-12 col-md-7">
            <div className="input-group mb-3">
              <span className="input-group-text">Email</span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                value={ email }
                onChange={ handleChange }
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-5 pb-3">
            <select
              select={ rating }
              onChange={ handleChange }
              name="rating"
              className="form-select"
              aria-label="Nota"
              defaultValue="Nota"
            >
              <option value="Nota" disabled>Nota</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-12 pb-3">
            <textarea
              className="form-control text-area"
              name="comment"
              value={ comment }
              onChange={ handleChange }
              data-testid="product-detail-evaluation"
              placeholder="Deixe um comentario"
            />
          </div>
          <div className="col-12">
            <input
              className="btn btn-success col-12 mb-3"
              value="Avaliar"
              type="submit"
              onClick={ handleClick }
            />
          </div>
        </div>
      </form>
    );
  }
}

AvaliationForm.propTypes = {
  comment: PropTypes.string,
  email: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

AvaliationForm.defaultProps = {
  comment: '',
  email: '',
};

export default AvaliationForm;
