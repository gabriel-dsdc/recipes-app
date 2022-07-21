import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import RecipeCard from '../components/RecipeCard';
import CategoryMeal from '../components/CategoryMeal';
import CategoryCocktail from '../components/CategoryCocktail';

const MAX_LENGTH = 12;

function Recipes() {
  const history = useHistory();
  const pathName = history.location.pathname;
  const { search, defaultFood, defaultDrinks } = useContext(MyContext);
  const defaultResults = pathName.includes('foods') ? defaultFood : defaultDrinks;
  const renderResults = search.searchResult.slice(0, MAX_LENGTH);
  const obj = {
    title: pathName.includes('foods') ? 'Foods' : 'Drinks',
    currentAPI: pathName.includes('foods') ? 'Meal' : 'Drink',
    database: pathName.includes('foods') ? 'meal' : 'cocktail',
    toRender: !search.searchResult[0] ? defaultResults : renderResults,
  };
  return (
    <>
      { pathName.split('/').length === 2
      && <Header title={ obj.title } />}
      { obj.title === 'Foods' ? <CategoryMeal /> : <CategoryCocktail />}
      {
        obj.toRender.map((recipe, index) => (
          <RecipeCard
            path={ pathName }
            id={ recipe[`id${obj.currentAPI}`] }
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
