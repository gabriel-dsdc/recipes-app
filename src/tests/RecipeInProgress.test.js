import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import {progress, fav} from './mocks/localStorage'


import copy from 'clipboard-copy';



jest.mock("clipboard-copy");

describe('verifica tela de Progresso', () => {

	test('verifica geral de pag progresso', async () => {

		localStorage.clear();
		localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
		renderWithRouter(<App />, "/drinks/15997/in-progress");
		const titulo = await screen.findByTestId('recipe-title', {timeout: 3500});
    expect(titulo).toBeInTheDocument();
		const image = await screen.findByTestId(/recipe-photo/,'',{timeout:3500})
		expect(image).toBeInTheDocument();

		const shareBtn = screen.getByTestId("share-btn")
		expect(shareBtn).toBeInTheDocument();

		const favBtn = screen.getByTestId("favorite-btn")
		expect(favBtn).toBeInTheDocument();

		const finalizar = screen.getByTestId("finish-recipe-btn");
		expect(finalizar).toBeInTheDocument();



	},10000)

	test('verifica fav click', async () => {

		localStorage.clear();
		localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
		localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
		renderWithRouter(<App />, "/drinks/15997/in-progress");
		await screen.findByTestId('recipe-title', {timeout: 3500});
		const btnFav = screen.getByTestId("favorite-btn");
		userEvent.click(btnFav);
		userEvent.click(btnFav);

	},6000)

	test('verifica selecionar itens', async () => {

		localStorage.clear();
		const { history } = renderWithRouter(<App />, "/drinks/15997/in-progress");
    await screen.findAllByTestId(/recipe-photo/,'',{timeout:3500});
		const ingredients = screen.getAllByTestId(/-ingredient-checkbox/);

		ingredients.forEach(el=>{
			userEvent.click(el);
		})

		const finish = screen.getByTestId("finish-recipe-btn")
		expect(finish).toBeInTheDocument();

		userEvent.click(finish);

		const {pathname} = history.location;
		expect(pathname).toBe("/done-recipes");

	},6000)

	test('verifica selecionar itens meal', async () => {

		localStorage.clear();
		const { history } = renderWithRouter(<App />, "/foods/52771/in-progress");
    await screen.findAllByTestId(/recipe-photo/,'',{timeout:3500});
		const ingredients = screen.getAllByTestId(/-ingredient-checkbox/);
		ingredients.forEach(el=>{
			userEvent.click(el);
		})
		const finish = screen.getByTestId("finish-recipe-btn")
		expect(finish).toBeInTheDocument();
		const btnFav = screen.getByTestId(/favorite-btn/i);
		userEvent.click(btnFav);
		userEvent.click(finish);
		const {pathname} = history.location;
		expect(pathname).toBe("/done-recipes");

	},6000)

	test('verifica deseleciona itens', async () => {

		localStorage.clear();
		renderWithRouter(<App />, "/drinks/15997/in-progress");
		await screen.findAllByTestId(/recipe-photo/,'',{timeout:3500});
		const ingredients = screen.getAllByTestId(/-ingredient-checkbox/);
		ingredients.forEach(el=>{
			userEvent.click(el);
		})

		userEvent.click(ingredients[0]);

		const finish = screen.getByTestId("finish-recipe-btn")
		expect(finish).toBeInTheDocument();

		userEvent.click(finish);

	},6000)


	test('verifica btn compartilhar', async () => {

		copy.mockImplementation(() => {})
    localStorage.clear();
    renderWithRouter(<App />, "/drinks/15997/in-progress");

		const btnShare = await screen.findAllByTestId(/share-btn/,'',{timeout:3500});

		userEvent.click(btnShare[0]);

		const messageCopy = screen.getAllByText(/link copied!/i);
		expect(messageCopy[0]).toBeInTheDocument();
		const btnFav = screen.getByTestId(/favorite-btn/i);
		userEvent.click(btnFav);
	}, 12000)


});