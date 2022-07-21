import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchRecipeWithID } from '../services/api';

const MAX_LENGTH = 6;

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const splited = pathname.split('/');
  const path = splited[1];
  const id = splited[2];
  const [currentRecipe, setCurrentRecipe] = useState([]);
  const [ingList, setIngList] = useState([]);
  const [measureList, setmeasureList] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const type = (path === 'foods') ? 'Meal' : 'Drink';
  const { defaultFood, defaultDrinks } = useContext(MyContext);

  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchRecipeWithID(path, id);
      setCurrentRecipe(recipe);
      const ingredientList = Object.entries(recipe[0]).filter((entry) => entry[0]
        .includes('strIngredient'))
        .filter((entry) => entry[1] !== '' && entry[1] !== null);
      setIngList(ingredientList);
      const measList = Object.entries(recipe[0]).filter((entry) => entry[0]
        .includes('strMeasure'))
        .filter((entry) => entry[1] !== null && entry[1] !== ' ');
      setmeasureList(measList);
    }
    getRecipe();
  }, []);

  useEffect(() => {
    const defaultResults = path.includes('foods') ? defaultFood : defaultDrinks;
    const renderResults = defaultResults.slice(0, MAX_LENGTH);
    setRecommend(renderResults);
  }, [defaultFood, defaultDrinks, id, path]);

  const recipe = currentRecipe[0];
  return (
    <div>
      {
        recipe && (
          <div>
            <img
              src={ currentRecipe[0][`str${type}Thumb`] }
              data-testid="recipe-photo"
              alt="recipe img"
            />
            <h2 data-testid="recipe-title">
              {' '}
              { currentRecipe[0][`str${type}`] }
              {' '}
            </h2>
            {
              path === 'foods' ? (
                <p data-testid="recipe-category">
                  {' '}
                  { currentRecipe[0].strCategory }
                </p>
              ) : (
                <p data-testid="recipe-category">
                  {' '}
                  { currentRecipe[0].strAlcoholic }
                </p>
              )
            }
            <h3>Ingredientes</h3>
            { ingList[0] && measureList[0]
            && ingList.map((ing, index) => (
              <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ing[1]}
                :
                {' '}
                {measureList[index][1]}
              </p>
            ))}
            <h3>Instruções</h3>
            <p data-testid="instructions">{ currentRecipe[0].strInstructions}</p>
            {
              path === 'foods' && (

                <div>
                  <p>Vídeo</p>
                  <iframe
                    src={ currentRecipe[0].strYoutube }
                    title="Youtube video play"
                  />
                  <p data-testid="video" />
                </div>
              )
            }
            <h3>Recomendações</h3>
            {
              recommend.map((recomendation, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img src={ recomendation[`str${type}Thumb`] } alt="thumb recommend" />
                  <p data-testid={ `${index}-recomendation-title` }>
                    { recomendation[`str${type}`] }
                  </p>
                </button>
              ))
            }
          </div>
        )
      }

    </div>
  );
}

export default RecipeDetails;