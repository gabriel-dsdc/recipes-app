import React, { useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';

function CategoryCocktail() {
  const { cocktail, setCocktail } = useContext(MyContext);

  async function getCocktailApi() {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json());
  }

  useEffect(() => {
    getCocktailApi().then((data) => {
      setCocktail(data.drinks);
    });
  }, []);

  const MAX_CATEGORY = 5;
  return (
    <div>
      { cocktail.slice(0, MAX_CATEGORY).map((cocktails, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${cocktails.strCategory}-category-filter` }
        >
          {cocktails.strCategory}
        </button>))}
    </div>

  );
}

export default CategoryCocktail;
