import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import MyContext from '../context/MyContext';

function Header({ title, hasSearch }) {
  const { setSearch } = useContext(MyContext);
  const [barVisible, setBarVisible] = useState(false);

  function openBar() {
    setBarVisible(!barVisible);
  }

  return (
    <>
      <header></header>
      <Link to="/profile">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Profile icon"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
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
        && <input
          data-testid="search-input"
          type="text"
          onChange={ ({ target: { value } }) => setSearch((prevState) => ({
            ...prevState,
            searchText: value,
          })) }
        />
      }
      <SearchBar />
    </>
  );
}

Header.defaultProps = {
  hasSearch: true,
};

Header.propTypes = {
  title: propTypes.string.isRequired,
  hasSearch: propTypes.bool,
};

export default Header;
