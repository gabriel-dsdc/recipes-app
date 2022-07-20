import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRecipeWithID } from '../services/api';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const splited = pathname.split('/');
  const path = splited[1];
  const id = splited[2];

  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchRecipeWithID(path, id);
      console.log(recipe);
    }
    getRecipe();
  }, []);

  return (
    <h1>Oláaaaaaaaaaaaaaaa</h1>
  );
}

export default RecipeDetails;
