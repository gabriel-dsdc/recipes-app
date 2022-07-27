import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
// import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [done, setDone] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);
  useEffect(() => {
    function getDoneRecipes() {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setDone(doneRecipes);
      setAllRecipes(doneRecipes);
    }
    getDoneRecipes();
  }, []);

  function copyLink(type, id) {
    console.log(type);
    const path = type === 'food' ? 'foods' : 'drinks';
    copy(`http://localhost:3000/${path}/${id}`);
    setClicked(true);
  }

  function filterRecipes({ target: { name } }) {
    if (name === 'food') {
      const filterFood = allRecipes.filter((rec) => rec.type === 'food');
      setDone(filterFood);
    } else if (name === 'drink') {
      const filterDrink = allRecipes.filter((rec) => rec.type === 'drink');
      setDone(filterDrink);
    } else {
      setDone(allRecipes);
    }
  }
  return (
    <>
      <Header title="Done Recipes" hasSearch={ false } />
      <p>Done Recipes</p>
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
      {
        done.map((recip, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recip.image }
              alt="card img"
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recip.type === 'food' ? (`${recip.nationality} -  ${recip.category}`)
                : (recip.alcoholicOrNot)}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>
              {recip.name}
              {' '}

            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {recip.doneDate}

            </p>
            <button
              onClick={ () => copyLink(recip.type, recip.id) }
              type="button"
            >
              { !clicked ? <img
                alt="share icon"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
              />
                : <p>Link copied!</p> }
            </button>

            {
              recip.tags.map((tag, indextag) => (
                <p key={ indextag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </p>
              ))
            }
          </div>
        ))

      }
    </>
  );
}

export default DoneRecipes;
