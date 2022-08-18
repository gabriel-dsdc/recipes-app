import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const pathName = history.location.pathname;
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    function getEmail() {
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        const { email } = user;
        setUserEmail(email);
      } else {
        global.alert('Nenhum email cadastrado');
      }
    }
    getEmail();
  }, []);

  const funcLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" hasSearch={ false } />
      <h1>Profile </h1>
      <h3 data-testid="profile-email">{userEmail}</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => funcLogout() }
      >
        Logout
      </button>
      {
        pathName === '/profile' && <Footer />
      }
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
