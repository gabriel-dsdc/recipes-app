import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');
// eslint-disable-next-line
function ShareAndFavorite({ id, recipe, type, pathname }) {
  const INITAL_COMPONENT_STATE = {
    shareMessage: false,
    recipe,
    id,
    favoriteIcon: whiteHeartIcon,
  };
  const [shareFavoriteState, setShareFavorite] = useState(INITAL_COMPONENT_STATE);

  useEffect(() => {
    function isFavorite() {
      const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (savedRecipes.some((recip) => recip.id === shareFavoriteState.id)) {
        setShareFavorite((prevState) => ({
          ...prevState,
          favoriteIcon: blackHeartIcon,
        }));
      }
    }

    function getFavorites() {
      if (localStorage.getItem('favoriteRecipes')) {
        isFavorite();
      }
    }
    getFavorites();
  }, [shareFavoriteState.id]);

  function toggleFavorites(fav) {
    const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (savedRecipes.some((item) => item.id === id)) {
      const newFav = savedRecipes.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify((newFav)));
      setShareFavorite((prevState) => ({
        ...prevState,
        favoriteIcon: whiteHeartIcon,
      }));
    } else {
      const array = [...savedRecipes, ...fav];
      localStorage.setItem('favoriteRecipes', JSON.stringify((array)));
      setShareFavorite((prevState) => ({
        ...prevState,
        favoriteIcon: blackHeartIcon,
      }));
    }
  }

  function firstFavorite(favs) {
    localStorage.setItem('favoriteRecipes', JSON.stringify((favs)));
    setShareFavorite((prevState) => ({
      ...prevState,
      favoriteIcon: blackHeartIcon,
    }));
  }

  function setFavorites(favoriteRecipe) {
    const favorites = [{
      id,
      type: type === 'Meal' ? 'food' : 'drink',
      nationality: type === 'Meal' ? favoriteRecipe.strArea : '',
      category: favoriteRecipe.strCategory,
      alcoholicOrNot: type === 'Meal' ? '' : favoriteRecipe.strAlcoholic,
      name: favoriteRecipe[`str${type}`],
      image: favoriteRecipe[`str${type}Thumb`],
    }];
    if (!localStorage.getItem('favoriteRecipes')) {
      firstFavorite(favorites);
    } else {
      toggleFavorites(favorites);
    }
  }

  return (
    <section>
      {
        shareFavoriteState.shareMessage ? (<p>Link copied!</p>) : (
          <input
            type="image"
            onClick={ () => {
              copy(`http://localhost:3000${pathname}`);
              setShareFavorite((prevState) => ({
                ...prevState,
                shareMessage: true,
              }));
            } }
            src={ shareIcon }
            data-testid="share-btn"
            alt="shareicon"
          />
        )
      }
      <input
        type="image"
        onClick={ () => { setFavorites(recipe); } }
        src={ shareFavoriteState.favoriteIcon }
        data-testid="favorite-btn"
        alt="favoriteicon"
      />
    </section>
  );
}

ShareAndFavorite.propTypes = {
  recipe: propTypes.objectOf(propTypes.string).isRequired,
  type: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  pathname: propTypes.string.isRequired,
};

export default ShareAndFavorite;
