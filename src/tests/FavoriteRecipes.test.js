import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { fav } from './mocks/localStorage';

jest.mock("clipboard-copy");

describe('Teste da tela de Receitas Favoritas', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
    renderWithRouter(<App />, "/favorite-recipes");
  });

  test('Verifica todos os botões de filtro da tela de Receitas Favoritas', () => {
    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    const foodsFilterBtn = screen.getByTestId('filter-by-food-btn');
    const drinksFilterBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(allFilterBtn);
    userEvent.click(foodsFilterBtn);
    userEvent.click(drinksFilterBtn);
  });

  test('Verifica o botão de compartilhar e desfavoritar da comida da tela de Receitas Favoritas', () => {
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(shareBtn);
    userEvent.click(favoriteBtn);
  });

  test('Verifica o botão de compartilhar e desfavoritar da bebida da tela de Receitas Favoritas', () => {
    const shareBtn = screen.getByTestId('1-horizontal-share-btn');
    const favoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');
    userEvent.click(shareBtn);
    userEvent.click(favoriteBtn);
  });
});