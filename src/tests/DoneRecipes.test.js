import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { done } from './mocks/localStorage';

jest.mock("clipboard-copy");

describe('Teste da tela de Receitas Finalizadas', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    renderWithRouter(<App />, "/done-recipes");
  });

  test('Verifica todos os filtros da tela de Receitas Finalizadas', () => {
    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    const foodsFilterBtn = screen.getByTestId('filter-by-food-btn');
    const drinksFilterBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(allFilterBtn);
    userEvent.click(foodsFilterBtn);
    userEvent.click(drinksFilterBtn);
  });

  test('Verifica a comida finalizada', () => {
    const foodShareBtn = screen.getByTestId("0-horizontal-share-btn");
    userEvent.click(foodShareBtn);
  });

  test('Verifica a bebida finalizada', () => {
    const drinkShareBtn = screen.getByTestId("1-horizontal-share-btn");
    userEvent.click(drinkShareBtn);
  });
});
