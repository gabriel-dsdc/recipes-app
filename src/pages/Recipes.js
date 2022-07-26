import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import RecipeCard from '../components/RecipeCard';

const MAX_LENGTH = 12;

function Recipes() {
  const history = useHistory();
  const pathName = history.location.pathname;
  const {
    search,
    defaultFood,
    defaultDrinks,
    categories,
    setCategory,
    categoryButton,
    setCategoryButton,
  } = useContext(MyContext);
  const defaultResults = pathName.includes('foods') ? defaultFood : defaultDrinks;
  // const categoryResults = !categoryButton[0] ? defaultResults : categoryButton;
  // const toRenderDefault = !search.searchResult[0] ? defaultResults : renderResults;
  const renderResults = search.searchResult.slice(0, MAX_LENGTH);
  const obj = {
    title: pathName.includes('foods') ? 'Foods' : 'Drinks',
    currentAPI: pathName.includes('foods') ? 'Meal' : 'Drink',
    database: pathName.includes('foods') ? 'meal' : 'cocktail',
    toRender: !search.searchResult[0] ? defaultResults : renderResults,
  };
  const databaseTeste = pathName.includes('foods') ? 'meal' : 'cocktail';

  async function getCategoryApi(categorySelected) {
    const apiResponseButton = pathName.includes('foods') ? 'meals' : 'drinks';
    const categoryResponse = await fetch(`https://www.the${databaseTeste}db.com/api/json/v1/1/filter.php?c=${categorySelected}`)
      .then((response) => response.json());
    setCategoryButton(categoryResponse[apiResponseButton]);
    // console.log('categoryButn', categoryResponse);
    // console.log(categorySelected);
  }

  useEffect(() => {
    async function fetchCategories() {
      const apiResponse = pathName.includes('foods') ? 'meals' : 'drinks';
      const resultCategories = await fetch(`https://www.the${databaseTeste}db.com/api/json/v1/1/list.php?c=list`)
        .then((response) => response.json());
      setCategory(resultCategories[apiResponse]);
      // console.log(resultCategories);
      // console.log('resultCategories[apiResponse]', resultCategories[apiResponse]);
    }
    fetchCategories();
  }, [obj.database]);

  const MAX_CATEGORY = 5;
  const MAX_RECIPES_CATEGORY = 12;
  return (
    <div className="recipes-ctn">
      { pathName.split('/').length === 2
&& <Header title={ obj.title } />}
      <div className="categories-ctn">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setCategoryButton([]) }
        >
          All
        </button>
        { categories && categories.slice(0, MAX_CATEGORY).map((categoriesBtn, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${categoriesBtn.strCategory}-category-filter` }
            onClick={ () => getCategoryApi(categoriesBtn.strCategory) }
          >
            {categoriesBtn.strCategory}
          </button>))}
      </div>
      <div className="recipes-card-ctn">
        { categoryButton.slice(0, MAX_RECIPES_CATEGORY).map((category, index1) => (
          <RecipeCard
            key={ category[`id${obj.currentAPI}`] }
            index={ index1 }
            name={ category[`str${obj.currentAPI}`] }
            image={ category[`str${obj.currentAPI}Thumb`] }
          />
        ))}
        {
          obj.toRender.map((recipe, index) => (
            <RecipeCard
              key={ recipe[`id${obj.currentAPI}`] }
              index={ index }
              name={ recipe[`str${obj.currentAPI}`] }
              image={ recipe[`str${obj.currentAPI}Thumb`] }
            />
          ))
        }

      </div>
      {
        pathName.split('/').length === 2 && <Footer />
      }
    </div>);
}

export default Recipes;
