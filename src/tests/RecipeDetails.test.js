import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import {progress, fav} from './mocks/localStorage'

import copy from 'clipboard-copy';

jest.mock("clipboard-copy");

describe('verifica tela de Progresso', () => {

	test('verifica geral de pag progresso', async () => {

		localStorage.clear();
		localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
		const { history } = renderWithRouter(<App />, "/drinks/17222");
		const titulo = await screen.findByRole('heading', { name: /a1/i }, {timeout: 3500});
		expect(titulo).toBeInTheDocument();
		const image = screen.getByTestId("recipe-photo")
		expect(image).toBeInTheDocument();
		const shareBtn = screen.getByTestId("share-btn")
		expect(shareBtn).toBeInTheDocument();
		const favBtn = screen.getByTestId("favorite-btn")
		expect(favBtn).toBeInTheDocument();
		const continueRecipe = screen.getByTestId("start-recipe-btn");
		userEvent.click(continueRecipe);
		const {pathname} = history.location;
		expect(pathname).toBe("/drinks/17222/in-progress");


	},6000)

	test('verifica fav click', async () => {

		localStorage.clear();
		localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
		localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
		renderWithRouter(<App />, "/drinks/17222");
		await screen.findByRole('heading', { name: /a1/i }, {timeout: 3500});
		const btnFav = screen.getByTestId("favorite-btn");
		userEvent.click(btnFav);
		userEvent.click(btnFav);

	},6000)

	test('verifica btn compartilhar', async () => {
		copy.mockImplementation(() => {})
		localStorage.clear();
		renderWithRouter(<App />, "/drinks/17222");
		const btnShare = await screen.findAllByTestId(/share-btn/,'',{timeout:3500});
		userEvent.click(btnShare[0]);
		const messageCopy = screen.getAllByText(/link copied!/i);
		expect(messageCopy[0]).toBeInTheDocument();
		const btnFav = screen.getByTestId(/favorite-btn/i);
		userEvent.click(btnFav);
	}, 12000)
	test('verifica selecionar itens', async () => {

		localStorage.clear();
		const { history } = renderWithRouter(<App />, "/drinks/17222");
		const continueRecipe = screen.getByTestId("start-recipe-btn");
		userEvent.click(continueRecipe);
		const {pathname} = history.location;
		expect(pathname).toBe("/drinks/17222/in-progress");

	},6000)
	test('verifica selecionar itens pag progress', async () => {

		localStorage.clear();

		renderWithRouter(<App />, "/foods/52771/in-progress");

		await screen.findAllByTestId(/recipe-photo/,'',{timeout:3500});

		const btnFav = screen.getByTestId(/favorite-btn/i);

		userEvent.click(btnFav);

	},6000)
});