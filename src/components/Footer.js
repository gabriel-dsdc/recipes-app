import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import drinkIcon from '../images/drinkIcon.svg';
import foodIcon from '../images/mealIcon.svg';

function Footer() {
  const { search, setSearch } = useContext(MyContext);
  const styles = {
    footer: {
      position: 'fixed',
      bottom: 0,
    },
  };

  function resetSearchResults() {
    setSearch({
      ...search,
      searchResult: [],
    });
  }
  return (
    <footer className="footer-ctn" data-testid="footer" style={ styles.footer }>
      <Link to="/foods">
        <button
          type="button"
          onClick={ resetSearchResults }
        >
          <img
            src={ foodIcon }
            data-testid="food-bottom-btn"
            alt="food icon"
          />

        </button>
      </Link>
      <p>Recipes App</p>
      <Link to="/drinks">
        <button
          type="button"
          onClick={ resetSearchResults }
        >
          <img
            src={ drinkIcon }
            data-testid="drinks-bottom-btn"
            alt="drink icon"
          />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
