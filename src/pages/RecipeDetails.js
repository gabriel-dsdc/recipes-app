import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchRecipeWithID } from '../services/api';
import mapIngredients from '../services/mapIngredients';
import styles from '../services/styles';
import ShareAndFavorite from '../components/ShareAndFavorite';

const MAX_LENGTH = 6;

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const { defaultFood, defaultDrinks } = useContext(MyContext);
  const history = useHistory();

  const splited = pathname.split('/');
  const path = splited[1];
  const id = splited[2];

  const DETAILS_RECIPE_STATE = {
    currentRecipe: [],
    ingList: [],
    measureList: [],
    recommend: [],
    typeRecomendation: (path === 'foods') ? 'Drink' : 'Meal',
    type: (path === 'foods') ? 'Meal' : 'Drink',
    objRecipe: [],
    inProgress: false,
  };

  const [state, setState] = useState(DETAILS_RECIPE_STATE);

  async function getRecipe() {
    const recipe = await fetchRecipeWithID(path, id);
    const ingredientes = (mapIngredients(recipe[0], 'strIngredient'));
    const measures = (mapIngredients(recipe[0], 'strMeasure'));
    setState((prevState) => ({
      ...prevState,
      currentRecipe: recipe,
      objRecipe: recipe[0],
      ingList: ingredientes,
      measureList: measures,
    }));
  }

  useEffect(() => {
    getRecipe();
  }, []);

  function handleRecipesInProgress() {
    if (localStorage.getItem('inProgressRecipes')) {
      const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const typeOfFood = (path === 'foods') ? 'meals' : 'cocktails';
      const idsOfRecipes = Object.keys(recipesInProgress[typeOfFood]);
      if (idsOfRecipes.some((eachId) => eachId === id)) {
        setState((prevState) => ({
          ...prevState,
          inProgress: true,
        }));
      }
    }
  }

  useEffect(() => {
    handleRecipesInProgress();
  }, []);

  useEffect(() => {
    const defaultResults = path.includes('foods') ? defaultDrinks : defaultFood;
    const renderResults = defaultResults.slice(0, MAX_LENGTH);
    setState((prevState) => ({
      ...prevState,
      recommend: renderResults,
    }));
  }, [defaultFood, defaultDrinks, id, path]);

  function handleStartRecipe() {
    history.push(`${pathname}/in-progress`);
  }

  return (
    <>
      {state.currentRecipe && (
        <div>
          <div className="recipe-photo">
            <img
              src={ state.objRecipe[`str${state.type}Thumb`] }
              data-testid="recipe-photo"
              alt="recipe img"
            />
          </div>
          <div className="recipe-title">
            <h2 data-testid="recipe-title">
              { state.objRecipe[`str${state.type}`] }
            </h2>
            {state.currentRecipe[0]
                && <ShareAndFavorite
                  recipe={ state.objRecipe }
                  type={ state.type }
                  id={ id }
                  pathname={ pathname }
                />}
          </div>
          {path === 'foods' ? (
            <p data-testid="recipe-category">
              { state.objRecipe.strCategory }
            </p>
          ) : (
            <p data-testid="recipe-category">
              { state.objRecipe.strAlcoholic }
            </p>
          )}
          <h3>Ingredientes</h3>
          <ol className="mg-15">
            { state.ingList.length > 0 && state.ingList.map((ing, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {`${ing} : ${state.measureList[index] ? state.measureList[index] : ''}`}
              </li>
            ))}
          </ol>
          <h3>Instruções</h3>
          <p
            data-testid="instructions"
            className="instructions"
          >
            { state.objRecipe.strInstructions}
          </p>
          {path === 'foods' && (
            <div className="video-container">
              <p>Vídeo</p>
              <iframe
                src={ state.objRecipe.strYoutube?.replace('watch?v=', 'embed/') }
                title="Youtube video play"
                data-testid="video"
              />
            </div>
          )}
          <h3>Recomendações</h3>
          <div className="recomendation-container">
            {state.recommend.map((recomendation, index) => (
              <div key={ index } className="recomendation-card">
                <input
                  type="image"
                  data-testid={ `${index}-recomendation-card` }
                  src={ recomendation[`str${state.typeRecomendation}Thumb`] }
                  alt="thumb recommend"
                />
                <p data-testid={ `${index}-recomendation-title` }>
                  { recomendation[`str${state.typeRecomendation}`] }
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <button
          style={ styles.divButton }
          type="button"
          data-testid="start-recipe-btn"
          className="recipe-btn"
          onClick={ handleStartRecipe }
        >
          {
            state.inProgress ? 'Continue Recipe' : 'Start recipe'
          }

        </button>
      </div>
    </>
  );
}

export default RecipeDetails;
