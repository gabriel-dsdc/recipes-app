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
    shareMessage: false,
  };

  const [state, setState] = useState(DETAILS_RECIPE_STATE);

  useEffect(() => {
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
    getRecipe();
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
    setState((prevState) => ({
      ...prevState,
      shareMessage: false,
    }));
    history.push(`${pathname}/in-progress`);
  }

  return (
    <div>
      {
        state.currentRecipe && (
          <div>
            <div>
              <img
                src={ state.objRecipe[`str${state.type}Thumb`] }
                style={ styles.firstImg }
                data-testid="recipe-photo"
                alt="recipe img"
              />
              <h2 data-testid="recipe-title">
                {' '}
                { state.objRecipe[`str${state.type}`] }
                {' '}
              </h2>
              {
                state.currentRecipe[0]
                && <ShareAndFavorite
                  recipe={ state.objRecipe }
                  shareMessage={ state.shareMessage }
                  type={ state.type }
                  id={ id }
                />
              }
            </div>
            {
              path === 'foods' ? (
                <p data-testid="recipe-category">
                  {' '}
                  { state.objRecipe.strCategory }
                </p>
              ) : (
                <p data-testid="recipe-category">
                  {' '}
                  { state.objRecipe.strAlcoholic }
                </p>
              )
            }
            <h3>Ingredientes</h3>
            { state.ingList.length > 0 && state.ingList.map((ing, index) => (
              <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ing[1]}
                :
                {' '}
                { state.ingList.length === state.measureList.length
                  ? state.measureList[index][1] : ''}
              </p>
            ))}
            <h3>Instruções</h3>
            <p data-testid="instructions">{ state.objRecipe.strInstructions}</p>
            {
              path === 'foods' && (

                <div>
                  <p>Vídeo</p>
                  <iframe
                    src={ state.objRecipe.strYoutube }
                    title="Youtube video play"
                  />
                  <p data-testid="video" />
                </div>
              )
            }
            <h3>Recomendações</h3>
            <div style={ styles.mainDiv }>
              {
                state.recommend.map((recomendation, index) => (
                  <button
                    style={ styles.subDivs }
                    type="button"
                    key={ index }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img
                      style={ styles.subDivsImg }
                      src={ recomendation[`str${state.typeRecomendation}Thumb`] }
                      alt="thumb recommend"
                    />
                    <p data-testid={ `${index}-recomendation-title` }>
                      { recomendation[`str${state.typeRecomendation}`] }
                    </p>
                  </button>
                ))
              }
            </div>

          </div>
        )
      }
      <div>
        <button
          style={ styles.divButton }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleStartRecipe }
        >
          Começar receita
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
