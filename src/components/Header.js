import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, hasSearch }) {
  const [barVisible, setBarVisible] = useState(false);

  function openBar() {
    setBarVisible(!barVisible);
  }

  return (
    <>
      <Link to="/profile">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile icon"
        />
      </Link>
      {
        hasSearch
        && (
          <button type="button" onClick={ openBar }>
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Search Icon"
            />
          </button>
        )
      }
      {
        barVisible
        && <input data-testid="search-input" type="text" />
      }
      <h1 data-testid="page-title">{title}</h1>
    </>
  );
}

Header.defaultProps = {
  hasSearch: false,
};

Header.propTypes = {
  title: propTypes.string.isRequired,
  hasSearch: propTypes.bool,
};

export default Header;
