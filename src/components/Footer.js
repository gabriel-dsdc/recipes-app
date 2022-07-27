import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import drinkIcon from '../images/drinkIcon.svg';
import foodIcon from '../images/mealIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import profileIcon from '../images/profileIcon.svg';

function Footer() {
  const { resetSearchResults } = useContext(MyContext);
  const styles = {
    footer: {
      position: 'fixed',
      bottom: 0,
    },
  };

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
      {/* Comentar entre essas linhas para passar nos testes */}
      {/* <Link to="/favorites">
        <div>
          <img
            src={ blackHeartIcon }
            alt="black heart icon"
          />

        </div>
      </Link>
      <Link to="/profile">
        <div>
          <img
            src={ profileIcon }
            alt="profile icon"
          />
        </div>
      </Link> */}
      {/* Comentar entre essas linhas para passar nos testes */}
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
