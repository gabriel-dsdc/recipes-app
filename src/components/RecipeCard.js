import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecipeCard({ index, image, name, id, path }) {
  const history = useHistory();
  function changePath() {
    history.push(`${path}/${id}`);
  }
  return (
    <div
      className="recipe-card"
      role="button"
      tabIndex={ index }
      data-testid={ `${index}-recipe-card` }
      onClick={ changePath }
      onKeyDown={ changePath }
    >
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
  id: propTypes.string.isRequired,
  path: propTypes.string.isRequired,
};

export default RecipeCard;
