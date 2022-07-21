import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRecipeWithID } from '../services/api';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const splited = pathname.split('/');
  const path = splited[1];
  const id = splited[2];
  const [currentRecipe, setCurrentRecipe] = useState([]);
  const [objectRecipe, setObjRecipe] = useState([]);
  const type = path === 'foods' ? 'Meal' : 'Drink';

  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchRecipeWithID(path, id);
      setCurrentRecipe(recipe);
      setObjRecipe(Object.entries(recipe[0]));
    }
    getRecipe();
  }, []);

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
          </div>
        )
      }

    </div>
  );
}

export default RecipeDetails;
