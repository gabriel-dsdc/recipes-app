import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Foods() {
  const history = useHistory();

  return (
    <>
      {history.location.pathname.split('/').length === 2 && <Header title="Foods" />}
      <p>Foods</p>
    </>);
}

export default Foods;
