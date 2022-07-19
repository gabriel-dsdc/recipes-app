import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { getRecipes } from '../services/api';

function SearchBar() {
  const { search, setSearch } = useContext(MyContext);
  const history = useHistory();
  const pathname = history.location.pathname.split('/')[1];

  async function handleSearch(database) {
    const allRecipes = await getRecipes(database, search.searchType, search.searchText);
    setSearch({
      ...search,
      searchResult: allRecipes,
    });
    if (!allRecipes[0]) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (allRecipes.length === 1) {
      const recipeId = allRecipes[0][Object.keys(allRecipes[0])[0]];
      history.push(`/${pathname}/${recipeId}`);
    }
  }

  return (
    <form
      onChange={ ({ target: { value } }) => setSearch((prevState) => ({
        ...prevState,
        searchType: value,
      })) }
    >
      <label htmlFor="ingredient-search-radio">
        <input
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          name="search"
          value="ingredient"
          type="radio"
          required
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          data-testid="name-search-radio"
          id="name-search-radio"
          name="search"
          value="name"
          type="radio"
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
          name="search"
          value="first-letter"
          type="radio"
        />
        First Letter
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => (pathname === 'foods'
          ? handleSearch('meal') : handleSearch('cocktail')) }
      >
        Search
      </button>
    </form>);
}

export default SearchBar;
