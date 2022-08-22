import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    function getFavRecipes() {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      setFavRecipes(favoriteRecipes);
      setAllRecipes(favoriteRecipes);
    }
    getFavRecipes();
  }, []);

  useEffect(() => {
    function setLocalStorage() {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    }
    setLocalStorage();
  }, [favRecipes]);

  function copyLink(type, id) {
    const path = type === 'food' ? 'foods' : 'drinks';
    copy(`http://localhost:3000/${path}/${id}`);
    setClicked(true);
  }

  function filterRecipes({ target: { name } }) {
    if (name === 'food') {
      const filterFood = allRecipes.filter((rec) => rec.type === 'food');
      setFavRecipes(filterFood);
    } else if (name === 'drink') {
      const filterDrink = allRecipes.filter((rec) => rec.type === 'drink');
      setFavRecipes(filterDrink);
    } else {
      setFavRecipes(allRecipes);
    }
  }

  const checkFavorite = (id) => favRecipes.some((recipe) => recipe.id === id);

  const handleFavorite = (id) => {
    if (checkFavorite(id)) {
      setFavRecipes(favRecipes.filter((recipe) => recipe.id !== id));
    }
  };

  return (
    <>
      <Header title="Favorite Recipes" hasSearch={ false } />
      <p>Favorite Recipes</p>
      <button
        type="button"
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ filterRecipes }
      >
        All
      </button>
      <button
        type="button"
        name="food"
        data-testid="filter-by-food-btn"
        onClick={ filterRecipes }
      >
        Food
      </button>
      <button
        type="button"
        name="drink"
        data-testid="filter-by-drink-btn"
        onClick={ filterRecipes }
      >
        Drinks
      </button>
      {favRecipes.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <div className="recipe-photo">
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt="card img"
              />
            </div>
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.type === 'food' ? (`${recipe.nationality} -  ${recipe.category}`)
              : (recipe.alcoholicOrNot)}
          </p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
              {' '}
            </p>
          </Link>
          <button
            onClick={ () => copyLink(recipe.type, recipe.id) }
            type="button"
          >
            { !clicked ? <img
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            /> : <p>Link copied!</p> }
          </button>
          <input
            type="image"
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
            alt="favoriteicon"
            onClick={ () => handleFavorite(recipe.id) }
          />
        </div>
      ))}
    </>
  );
}

export default FavoriteRecipes;
