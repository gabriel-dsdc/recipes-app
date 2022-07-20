import React, { useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';

function CategoryMeal() {
  const { meal, setMeal, categoryMeal, setCategoryMeal } = useContext(MyContext);

  async function getMealApi() {
    return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json());
  }

  async function getCategoryApi(categorySelected) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorySelected}`)
      .then((response) => response.json())
      .then((result) => setCategoryMeal(result.meals));
  }

  useEffect(() => {
    getMealApi().then((response) => {
      setMeal(response.meals);
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
          onClick={ () => setCategoryMeal([]) }
        >
          All
        </button>
        { meal.slice(0, MAX_CATEGORY).map((meals, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${meals.strCategory}-category-filter` }
            onClick={ () => getCategoryApi(meals.strCategory) }
          >
            {meals.strCategory}
          </button>))}
      </div>
      <div>
        { categoryMeal.slice(0, MAX_RECIPES).map((meals, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              key={ index }
              src={ meals.strMealThumb }
              alt={ meals.strMealThumb }
            />
            <p key={ index } data-testid={ `${index}-card-name` }>
              {' '}
              {meals.strMeal}
            </p>
          </div>
        ))}
      </div>
    </div>

  );
}

export default CategoryMeal;
