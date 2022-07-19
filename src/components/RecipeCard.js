import React from 'react';
import propTypes from 'prop-types';

function RecipeCard({ index, image, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ image } data-testid={ `${index}-card-img` } alt={ name } />
      <p data-testid={ `${index}-card-name` }>
        {' '}
        {name}
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  index: propTypes.number.isRequired,
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};

export default RecipeCard;
