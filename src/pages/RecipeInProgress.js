import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchRecipeWithID } from '../services/api';

function RecipeInProgress() {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [ingList, setIngList] = useState([]);
  const [measureList, setMeasureList] = useState([['a', 'b'], ['c', 'd']]);
  const { pathname } = useLocation();
  const splited = pathname.split('/');
  const path = splited[1];
  const id = splited[2];
  const type = (path === 'foods') ? 'Meal' : 'Drink';
  const [isCopied, setIsCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const RECIPE_NUMBER = 13;
  const LAST_LETTER = -1;

  const checkDisabled = useCallback(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      cocktails: {},
      meals: {},
    };
    const recipeType = path === 'foods' ? 'meals' : 'cocktails';
    const { [recipeType]: mealsOrCocktails } = inProgressRecipes;
    return mealsOrCocktails[id]?.length !== ingList.length;
  }, [path, id, ingList]);

  useEffect(() => {
    const fetchAndSetRecipe = async () => {
      const recipe = await fetchRecipeWithID(path, id);
      setCurrentRecipe(recipe[0]);
      setIsDisabled(checkDisabled());
    };
    fetchAndSetRecipe();
  }, [path, id, checkDisabled]);

  useEffect(() => {
    const getRecipe = async () => {
      const ingredientList = Object.entries(currentRecipe).filter((entry) => entry[0]
        .includes('strIngredient'))
        .filter((entry) => entry[1] !== '' && entry[1] !== null);
      setIngList(ingredientList);
      const measList = Object.entries(currentRecipe).filter((entry) => entry[0]
        .includes('strMeasure'));
      setMeasureList(measList);
    };
    getRecipe();
  }, [currentRecipe]);

  const isChecked = (ingredientId) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      cocktails: {},
      meals: {},
    };
    if (path === 'foods') {
      return inProgressRecipes.meals[id]?.includes(ingredientId);
    }
    return inProgressRecipes.cocktails[id]?.includes(ingredientId);
  };
  const handleCheck = ({ target: { value } }) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      cocktails: {},
      meals: {},
    };
    const recipeType = path === 'foods' ? 'meals' : 'cocktails';
    const { [recipeType]: mealsOrCocktails } = inProgressRecipes;

    if (isChecked(value)) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        [recipeType]: {
          ...mealsOrCocktails,
          [id]: inProgressRecipes[recipeType][id]
            .filter((recipe) => recipe !== value),
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        [recipeType]: {
          ...mealsOrCocktails,
          [id]: mealsOrCocktails[id]
            ? [...mealsOrCocktails[id], value]
            : [value],
        },
      }));
    }
    setIsDisabled(checkDisabled());
  };

  const checkFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    return favoriteRecipes.some((recipe) => recipe.id === id);
  };
  const [isFavorite, setIsFavorite] = useState(checkFavorite());
  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (checkFavorite()) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes
        .filter((recipe) => recipe.id !== id)));
    } else {
      const { strArea, strCategory, strAlcoholic } = currentRecipe;
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, {
        id,
        type: path.slice(0, LAST_LETTER),
        nationality: strArea || '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic || '',
        name: currentRecipe[`str${type}`],
        image: currentRecipe[`str${type}Thumb`],
      }]));
    }
    setIsFavorite(checkFavorite());
  };

  return (
    <>
      <div className="recipe-photo">
        <img
          src={ currentRecipe[`str${type}Thumb`] }
          data-testid="recipe-photo"
          alt={ `${currentRecipe[`str${type}`]}` }
        />
      </div>
      <div className="recipe-title">
        <h2 data-testid="recipe-title">{currentRecipe[`str${type}`]}</h2>
        <span>
          <input
            data-testid="share-btn"
            type="image"
            src={ shareIcon }
            alt="Share button"
            onClick={ () => {
              copy(`http://localhost:3000/${path}/${id}`);
              setIsCopied(true);
            } }
          />
          <input
            data-testid="favorite-btn"
            type="image"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite button"
            onClick={ handleFavorite }
          />
        </span>
      </div>
      {isCopied && <span>Link copied!</span>}
      {path === 'foods' ? (
        <p data-testid="recipe-category">
          { currentRecipe.strCategory }
        </p>
      ) : (
        <p data-testid="recipe-category">
          { currentRecipe.strAlcoholic }
        </p>
      )}
      <h3>Ingredients</h3>
      <ol className="mg-15">
        {ingList[0] && measureList[0] && ingList.map((recipe, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <label htmlFor={ `${index}-ingredient-checkbox` }>
              <input
                type="checkbox"
                id={ `${index}-ingredient-checkbox` }
                value={ recipe[0].slice(RECIPE_NUMBER) }
                defaultChecked={ isChecked(recipe[0].slice(RECIPE_NUMBER)) || false }
                onChange={ (e) => handleCheck(e) }
              />
              {` ${recipe[1]}${measureList[index][1]
                ? ` - ${measureList[index][1]}` : ''}`}
            </label>
          </li>
        ))}
      </ol>
      <h3>Instructions</h3>
      <p
        data-testid="instructions"
        className="instructions"
      >
        {currentRecipe.strInstructions}
      </p>
      <Link to="/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          className="recipe-btn"
          type="button"
          disabled={ isDisabled }
        >
          Finish Recipe
        </button>
      </Link>
    </>);
}

export default RecipeInProgress;
