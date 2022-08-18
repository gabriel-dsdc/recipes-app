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
  const [defaultFood, setDefaultFood] = useState([]);
  const [defaultDrinks, setDefaultDrinks] = useState([]);
  const [cocktail, setCocktail] = useState([]);
  const [meal, setMeal] = useState([]);
  const [categories, setCategory] = useState([]);
  const [categoryButton, setCategoryButton] = useState([]);

  useEffect(() => {
    const fetchDefault = async () => {
      const drinks = await getDefaultResponse('drink');
      const food = await getDefaultResponse('food');
      setDefaultDrinks(drinks.slice(0, MAX_LENGTH));
      setDefaultFood(food.slice(0, MAX_LENGTH));
    };
    fetchDefault();

    return () => {
      setDefaultDrinks([]);
      setDefaultFood([]);
    };
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
        categories,
        setCategory,
        categoryButton,
        setCategoryButton,
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
