import React from 'react';

const Form = () => (
  <form action="userForm">
    <label htmlFor="rating">
      Nota (entre 1 e 5):
      <input
        type="number"
        id="rating"
        min="1"
        max="5"
      />
    </label>
    <label htmlFor="comment">
      Avalie o produto:
      <textarea
        name="comment"
        id="comment"
        form="userForm"
        cols="30"
        rows="10"
        maxLength="50"
        placeholder="Deixe seu comentário..."
        data-testid="product-detail-evaluation"
      />
    </label>
  </form>
);

export default Form;
