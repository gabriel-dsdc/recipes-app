import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';
import { getDefaultResponse } from '../services/api';

const MAX_LENGTH = 12;

function Provider({ children }) {
  const INITIAL_SEARCH = {
    searchText: '',
    searchType: '',
    searchResult: [],
  };
  const [search, setSearch] = useState(INITIAL_SEARCH);
  const [defaultFood, setdefaultFood] = useState([]);
  const [defaultDrinks, setDefaultDrinks] = useState([]);
  const [cocktail, setCocktail] = useState([]);
  const [meal, setMeal] = useState([]);
  const [categoryMeal, setCategoryMeal] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);

  useEffect(() => {
    async function fetchDefault() {
      const drinks = await getDefaultResponse('drink');
      const food = await getDefaultResponse('food');
      setDefaultDrinks((drinks.slice(0, MAX_LENGTH)));
      setdefaultFood(food.slice(0, MAX_LENGTH));
    }
    fetchDefault();
  }, []);
  return (
    <MyContext.Provider
      value={ {
        search,
        setSearch,
        meal,
        setMeal,
        cocktail,
        setCocktail,
        defaultFood,
        defaultDrinks,
        categoryMeal,
        setCategoryMeal,
        categoryDrink,
        setCategoryDrink,
      } }
    >
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
