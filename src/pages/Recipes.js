import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import RecipeCard from '../components/RecipeCard';
import { getDefaultRecipes } from '../services/api';
import CategoryMeal from '../components/CategoryMeal';
import CategoryCocktail from '../components/CategoryCocktail';

const MAX_LENGTH = 12;

function Recipes() {
  const history = useHistory();
  const pathName = history.location.pathname;
  const { search, setSearch } = useContext(MyContext);
  const obj = {
    title: pathName.includes('foods') ? 'Foods' : 'Drinks',
    currentAPI: pathName.includes('foods') ? 'Meal' : 'Drink',
    database: pathName.includes('foods') ? 'meal' : 'cocktail',
  };

  const callback = useCallback(async () => {
    const allRecipes = await getDefaultRecipes(obj.database);
    setSearch({
      ...search,
      searchResult: allRecipes,
    });
  }, []);

  useEffect(() => {
    if (!search.searchResult.length) {
      callback();
    }
  }, []);

  const renderResults = search.searchResult.slice(0, MAX_LENGTH);
  return (
    <>
      { pathName.split('/').length === 2
      && <Header title={ obj.title } />}
      { obj.title === 'Foods' ? <CategoryMeal /> : <CategoryCocktail />}
      {
        renderResults.map((recipe, index) => (
          <RecipeCard
            key={ recipe[`id${obj.currentAPI}`] }
            index={ index }
            name={ recipe[`str${obj.currentAPI}`] }
            image={ recipe[`str${obj.currentAPI}Thumb`] }
          />
        ))
      }
      {
        pathName.split('/').length === 2 && <Footer />
      }
    </>);
}

export default Recipes;
