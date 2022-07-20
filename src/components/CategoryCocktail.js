import React, { useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';

function CategoryCocktail() {
  const {
    cocktail,
    setCocktail,
    categoryDrink,
    setCategoryDrink,
  } = useContext(MyContext);

  async function getCocktailApi() {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json());
  }

  async function getCategoryApi(categorySelected) {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorySelected}`)
      .then((response) => response.json())
      .then((result) => setCategoryDrink(result.drinks));
  }

  useEffect(() => {
    getCocktailApi().then((data) => {
      setCocktail(data.drinks);
    });
  }, []);

  const MAX_RECIPES = 12;
  const MAX_CATEGORY = 5;
  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setCategoryDrink([]) }
        >
          All
        </button>
        { cocktail.slice(0, MAX_CATEGORY).map((cocktails, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${cocktails.strCategory}-category-filter` }
            onClick={ () => getCategoryApi(cocktails.strCategory) }
          >
            {cocktails.strCategory}
          </button>))}
      </div>
      <div>
        { categoryDrink.slice(0, MAX_RECIPES).map((drinks, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              key={ index }
              src={ drinks.strDrinkThumb }
              alt={ drinks.strMealThumb }
            />
            <p key={ index } data-testid={ `${index}-card-name` }>
              {' '}
              {drinks.strDrink}
            </p>
          </div>
        ))}
      </div>
    </div>

  );
}

export default CategoryCocktail;
