import React, { useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';

function CategoryMeal() {
  const { meal, setMeal } = useContext(MyContext);

  async function getMealApi() {
    return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json());
  }

  useEffect(() => {
    getMealApi().then((data) => {
      setMeal(data.meals);
      console.log(data.meals);
    });
  }, []);

  const MAX_CATEGORYS = 5;
  return (
    <div>
      { meal.slice(0, MAX_CATEGORYS).map((meals, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${meals.strCategory}-category-filter` }
        >
          {meals.strCategory}
        </button>))}
    </div>

  );
}

export default CategoryMeal;
