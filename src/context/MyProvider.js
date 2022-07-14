import React, { useState } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [estadoTeste, setEstadoTeste] = useState('');
  return (
    <MyContext.Provider value={ { estadoTeste, setEstadoTeste } }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
