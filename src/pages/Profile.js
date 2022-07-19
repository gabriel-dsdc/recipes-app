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
    </>
  );
}

export default Profile;
