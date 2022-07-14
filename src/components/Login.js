import React, { useState } from 'react';

function Login() {
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setUserEmail(target.value);
    } else if (target.name === 'password') {
      setUserPassword(target.value);
    }
  };

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
        // disabled={}
        // onClick={}
      >
        Enter
      </button>

    </form>
  );
}

export default Login;
