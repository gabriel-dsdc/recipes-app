import React, { useState } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const INITIAL_SEARCH = {
    searchText: '',
    searchType: '',
    searchResult: [],
  };

  const [search, setSearch] = useState(INITIAL_SEARCH);
  return (
    <MyContext.Provider value={ { search, setSearch } }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
