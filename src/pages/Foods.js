import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Foods() {
  const history = useHistory();
  const pathName = history.location.pathname;

  return (
    <>
      {history.location.pathname.split('/').length === 2 && <Header title="Foods" />}
      <p>Foods</p>
      <p>Drinks</p>
      {
        pathName === '/foods' && <Footer />
      }
    </>);
}

export default Foods;
