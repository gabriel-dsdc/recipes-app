import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const history = useHistory();
  const pathName = history.location.pathname;

  return (
    <>
      {history.location.pathname.split('/').length === 2 && <Header title="Drinks" />}
      <p>Drinks</p>
      {
        pathName === '/drinks' && <Footer />
      }
    </>
  );
}

export default Drinks;
