import React from 'react';
import propTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, hasSearch }) {
  return (
    <>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
      {hasSearch
      && <img data-testid="search-top-btn" src={ searchIcon } alt="Search Icon" />}
      <h1 data-testid="page-title">{title}</h1>
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
