import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import foodIcon from '../images/mealIcon.svg';

function Footer() {
  const styles = {
    footer: {
      position: 'fixed',
      bottom: 0,
    },
  };
  return (
    <footer data-testid="footer" style={ styles.footer }>
      <Link to="/foods">
        <img src={ foodIcon } data-testid="food-bottom-btn" alt="food icon" />
      </Link>
      <Link to="/drinks">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drink icon" />
      </Link>
    </footer>
  );
}

export default Footer;
