import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Drinks() {
  const history = useHistory();

  return (
    <>
      {history.location.pathname.split('/').length === 2 && <Header title="Drinks" />}
      <p>Drinks</p>
    </>
  );
}

export default Drinks;
