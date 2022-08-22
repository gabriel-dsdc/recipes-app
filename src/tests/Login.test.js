import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {}
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Testa a tela de login', () => {
  test('Teste inicial', () => {
    renderWithRouter(<App/>);

    const email = screen.getByTestId("email-input");
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId("password-input");
    expect(password).toBeInTheDocument();

    const button = screen.getByTestId("login-submit-btn");
    expect(button).toBeInTheDocument();
  });

  test('Verifica se botão começa desabilitado, e é habilitado após dados corretos', () => {
    renderWithRouter(<App/>);

    const email = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const button = screen.getByTestId("login-submit-btn");

    expect(button).toBeDisabled();

    userEvent.type(email, 'andre@example.com');
    userEvent.type(password, '123456Aa');

    expect(button).toBeEnabled();
  })

  test('Verifica se os dados são salvos', () => {
    renderWithRouter(<App/>);

    const email = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const button = screen.getByTestId("login-submit-btn");

    userEvent.type(email, 'andre@example.com');
    userEvent.type(password, '123456Aa');
    userEvent.click(button);

    const user = localStorage.getItem('user');
    expect(user).toEqual('{"email":"andre@example.com"}');
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(mealsToken).toEqual('1');
    expect(cocktailsToken).toEqual('1')

  })
});
