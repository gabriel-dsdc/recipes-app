import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
// import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [done, setDone] = useState([]);
  useEffect(() => {
    function getDoneRecipes() {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setDone(doneRecipes);
      console.log(doneRecipes);
    }
    getDoneRecipes();
  }, []);
  return (
    <>
      <Header title="Done Recipes" hasSearch={ false } />
      <p>Done Recipes</p>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
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
              { recip.type === 'Meal' ? (`${recip.nationality} -  ${recip.category}`)
                : (recip.alcoholicOrNot)}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>
              {recip.name}
              {' '}

            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {recip.doneDate}

            </p>
            <img
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt=""
            />
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
