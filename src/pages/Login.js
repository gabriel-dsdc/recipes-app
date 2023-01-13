import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const history = useHistory();

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setUserEmail(target.value);
    }
    if (target.name === 'password') {
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
    <div className="login-box">
      <div className="title-cnt">
        <h1>
          Recipes App
        </h1>
      </div>
      <div className="form-img-cnt">
        <div className="img-cnt">
          <img
            src="https://i.ibb.co/7b0wBvy/mellow-home-cook.png"
            alt="Illustration by https://icons8.com/illustrations/author/kP9rc8JiBCcz Irene M. Ray https://icons8.com/illustrations Ouch!"
          />
        </div>
        <div className="form-cnt">
          <form>
            <input
              data-testid="email-input"
              type="email"
              placeholder="email@adress.com"
              name="email"
              autoComplete="email"
              value={ email }
              onChange={ handleChange }
            />
            <input
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="*******"
              autoComplete="current-password"
              value={ password }
              onChange={ handleChange }
            />
            <button
              data-testid="login-submit-btn"
              type="button"
              disabled={ validateBtn() }
              onClick={ saveUserEmail }
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
