import React from "react";
import App from "../App";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";

const EMAIL = "andre@example.com";
const PASSWORD = "123123Aa";

describe("Teste da página Profile.js", () => {
  test('Verifica se o alerta acontece ao não ter um usuário logado', async () => {
    localStorage.removeItem('user');
    global.alert = jest.fn((msg) => msg);
    renderWithRouter(<App />, "/profile");
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  test('Verifica se o botão Done Recipes funciona corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId("email-input");
    userEvent.type(email, EMAIL);

    const password = screen.getByTestId("password-input");
    userEvent.type(password, PASSWORD);

    const button = screen.getByTestId("login-submit-btn");
    userEvent.click(button);

    history.push("/profile");

    const done = screen.getByTestId("profile-done-btn");
    userEvent.click(done);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe("/done-recipes");
  });

  test('Verifica se o botão Favorite Recipes funciona corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId("email-input");
    userEvent.type(email, EMAIL);

    const password = screen.getByTestId("password-input");
    userEvent.type(password, PASSWORD);

    const button = screen.getByTestId("login-submit-btn");
    userEvent.click(button);

    history.push("/profile");

    const favorite = screen.getByTestId("profile-favorite-btn");
    userEvent.click(favorite);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe("/favorite-recipes");
  });

  test('Verifica se o botão Logout funciona corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId("email-input");
    userEvent.type(email, EMAIL);

    const password = screen.getByTestId("password-input");
    userEvent.type(password, PASSWORD);

    const button = screen.getByTestId("login-submit-btn");
    userEvent.click(button);

    history.push("/profile");

    const logout = screen.getByTestId("profile-logout-btn");
    userEvent.click(logout);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe("/");
  });
});