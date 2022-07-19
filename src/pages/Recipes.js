import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import RecipeCard from '../components/RecipeCard';

const MAX_LENGTH = 12;

function Recipes() {
  const history = useHistory();
  const pathName = history.location.pathname;
  const { search: { searchResult } } = useContext(MyContext);
  const drinksResult = searchResult.slice(0, MAX_LENGTH);
  const obj = {
    title: pathName.includes('foods') ? 'Foods' : 'Drinks',
    currentAPI: pathName.includes('foods') ? 'Meal' : 'Drink',
    results: pathName.includes('foods') ? searchResult : drinksResult,
  };

  return (
    <>
      { pathName.split('/').length === 2
      && <Header title={ obj.title } />}
      {
        obj.results.map((recipe, index) => (
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
