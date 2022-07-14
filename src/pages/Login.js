import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const history = useHistory();

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setUserEmail(target.value);
    } else if (target.name === 'password') {
      setUserPassword(target.value);
    }
  };

  function validateBtn() {
    const MIN_LENGTH = 6;
    let validation = true;
    if (email.includes('@') && email.includes('.com') && password.length > MIN_LENGTH) {
      validation = false;
    }
    return validation;
  }

  function saveUserEmail() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({
      email,
    }));

    history.push('/foods');
  }

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ validateBtn() }
        onClick={ saveUserEmail }
      >
        Enter
      </button>

    </form>
  );
}

export default Login;
