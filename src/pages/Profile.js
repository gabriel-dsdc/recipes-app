import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const pathName = history.location.pathname;
  return (
    <>
      <Header title="Profile" hasSearch={ false } />
      <p>Profile</p>
      {
        pathName === '/profile' && <Footer />
      }
      <h3 data-testid="profile-email">Email</h3>
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
      >
        Logout
      </button>
    </>
  );
}

export default Profile;
