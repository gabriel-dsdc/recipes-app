import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchRecipeWithID } from '../services/api';
import shareIcon from '../images/shareIcon.svg';
import mapIngredients from '../services/mapIngredients';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const MAX_LENGTH = 6;

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const { defaultFood, defaultDrinks } = useContext(MyContext);
  const history = useHistory();

  const splited = pathname.split('/');
  const path = splited[1];
  const id = splited[2];

  const [currentRecipe, setCurrentRecipe] = useState([]);
  const [ingList, setIngList] = useState([]);
  const [measureList, setmeasureList] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const typeRecomendation = (path === 'foods') ? 'Drink' : 'Meal';
  const type = (path === 'foods') ? 'Meal' : 'Drink';
  const [objRecipe, setObjRecipe] = useState([]);
  const [shareMessage, setShareMessage] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);

  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchRecipeWithID(path, id);
      setCurrentRecipe(recipe);
      setObjRecipe(recipe[0]);
      setIngList(mapIngredients(recipe[0], 'strIngredient'));
      setmeasureList(mapIngredients(recipe[0], 'strMeasure'));
    }
    getRecipe();
  }, []);

  useEffect(() => {
    function getFavorites() {
      if (localStorage.getItem('favoriteRecipes')) {
        const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        if (savedRecipes.some((recip) => recip.id === id)) {
          setFavoriteIcon(blackHeartIcon);
        }
      }
    }
    getFavorites();
  }, []);

  useEffect(() => {
    const defaultResults = path.includes('foods') ? defaultDrinks : defaultFood;
    const renderResults = defaultResults.slice(0, MAX_LENGTH);
    setRecommend(renderResults);
  }, [defaultFood, defaultDrinks, id, path]);

  const styles = {
    divButton: {
      position: 'fixed',
      bottom: 0,
    },
    firstImg: {
      width: '200px',
    },
    mainDiv: {
      width: '300px',
      display: 'flex',
      overflow: 'scroll',
    },
    subDivs: {
      width: '50vw',
    },
    subDivsImg: {
      width: '150px',
    },
  };

  function handleStartRecipe() {
    setShareMessage(false);
    history.push(`${pathname}/in-progress`);
  }

  function favoriteRecipe(recipe) {
    setFavoriteIcon(blackHeartIcon);
    const favorites = [
      {
        id,
        type: type === 'Meal' ? 'food' : 'drink',
        nationality: type === 'Meal' ? recipe.strArea : '',
        category: recipe.strCategory,
        alcoholicOrNot: type === 'Meal' ? '' : recipe.strAlcoholic,
        name: recipe[`str${type}`],
        image: recipe[`str${type}Thumb`],
      },
    ];
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify((favorites)));
    } else {
      const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const array = [...savedRecipes, ...favorites];
      console.log(array);
      localStorage.setItem('favoriteRecipes', JSON.stringify((array)));
    }
  }

  return (
    <div>
      {
        currentRecipe && (
          <div>
            <div>
              <img
                src={ objRecipe[`str${type}Thumb`] }
                style={ styles.firstImg }
                data-testid="recipe-photo"
                alt="recipe img"
              />
              <h2 data-testid="recipe-title">
                {' '}
                { objRecipe[`str${type}`] }
                {' '}
              </h2>
              <button
                data-testid="share-btn"
                type="button"
                onClick={ () => { copy(objRecipe.strSource); setShareMessage(true); } }
              >
                {
                  shareMessage ? (<p>Link copied!</p>) : (
                    <img
                      src={ shareIcon }
                      alt="shareIcon"
                    />
                  )
                }
              </button>
              <input
                type="image"
                onClick={ () => { favoriteRecipe(objRecipe); } }
                src={ favoriteIcon }
                data-testid="favorite-btn"
                alt="favoriteicon"
              />

            </div>

            {
              path === 'foods' ? (
                <p data-testid="recipe-category">
                  {' '}
                  { objRecipe.strCategory }
                </p>
              ) : (
                <p data-testid="recipe-category">
                  {' '}
                  { objRecipe.strAlcoholic }
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
            <p data-testid="instructions">{ objRecipe.strInstructions}</p>
            {
              path === 'foods' && (

                <div>
                  <p>Vídeo</p>
                  <iframe
                    src={ objRecipe.strYoutube }
                    title="Youtube video play"
                  />
                  <p data-testid="video" />
                </div>
              )
            }
            <h3>Recomendações</h3>
            <div style={ styles.mainDiv }>
              {
                recommend.map((recomendation, index) => (
                  <button
                    style={ styles.subDivs }
                    type="button"
                    key={ index }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img
                      style={ styles.subDivsImg }
                      src={ recomendation[`str${typeRecomendation}Thumb`] }
                      alt="thumb recommend"
                    />
                    <p data-testid={ `${index}-recomendation-title` }>
                      { recomendation[`str${typeRecomendation}`] }
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
