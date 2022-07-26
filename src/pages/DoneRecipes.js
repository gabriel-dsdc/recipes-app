import React from 'react';
import Header from '../components/Header';
// import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  return (
    <>
      <Header title="Done Recipes" hasSearch={ false } />
      <p>Done Recipes</p>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <img data-testid="index-horizontal-image" src="" alt="" />
      <p data-testid="index-horizontal-top-text" />
      <p data-testid="index-horizontal-name" />
      <p data-testid="index-horizontal-done-date" />
      <img
        type="button"
        data-testid="index-horizontal-share-btn"
        src={ shareIcon }
        alt=""
      />
      <p data-testid="index-tagName-horizontal-tag" />
    </>
  );
}

export default DoneRecipes;
