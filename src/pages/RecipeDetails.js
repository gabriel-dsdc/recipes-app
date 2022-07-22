import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchRecipeWithID } from '../services/api';

const copy = require('clipboard-copy');

const MAX_LENGTH = 6;

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
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
  const { defaultFood, defaultDrinks } = useContext(MyContext);
  const [objRecipe, setObjRecipe] = useState([]);
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
    history.push(`${pathname}/in-progress`);
  }

  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchRecipeWithID(path, id);
      setCurrentRecipe(recipe);
      setObjRecipe(recipe[0]);
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

  //   [{
  //     id: id-da-receita,
  //     type: food-ou-drink,
  //     nationality: nacionalidade-da-receita-ou-texto-vazio,
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita
  // }]

  useEffect(() => {
    const defaultResults = path.includes('foods') ? defaultDrinks : defaultFood;
    const renderResults = defaultResults.slice(0, MAX_LENGTH);
    setRecommend(renderResults);
  }, [defaultFood, defaultDrinks, id, path]);

  const [shareMessage, setShareMessage] = useState('');
  const TIME_IN_SECONDS = 3000;

  function copyShareLink(link) {
    copy(link);
    setShareMessage('Link copied!');
    setTimeout(() => {
      setShareMessage('');
    }, TIME_IN_SECONDS);
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
              <p>{ shareMessage }</p>
              <button
                data-testid="share-btn"
                type="button"
                onClick={ () => copyShareLink(objRecipe.strSource) }
              >
                Compartilhar
              </button>
              <button data-testid="favorite-btn" type="button">
                Favoritar
              </button>
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
                    {/* {
                      path === 'foods' ? (
                        <p data-testid={ `${index}-recomendation-title` }>
                          {' '}
                          { recomendation.strCategory }
                        </p>
                      ) : (
                        <p data-testid={ `${index}-recomendation-title` }>
                          {' '}
                          { recomendation.strAlcoholic }
                        </p>
                      )
                    } */}
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
