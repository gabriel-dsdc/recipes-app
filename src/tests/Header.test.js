import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
describe('verifica se Header renderiza corretamente', () => {
	test('Verifica elementos do header na tela foods', () => {
		const { history } = renderWithRouter(<App />, "/foods");
		const titulo = screen.getByRole('heading', { name: /foods/i });
		expect(titulo).toBeInTheDocument();
		const profile = screen.getByTestId('profile-top-btn');
		const search = screen.getByTestId('search-top-btn');
		expect(profile).toBeInTheDocument();
		expect(search).toBeInTheDocument();
		userEvent.click(search);
		const inputSearch = screen.getByTestId('search-input');
		expect(inputSearch).toBeInTheDocument();
		userEvent.type(inputSearch,"onion");
		expect(inputSearch).toHaveValue("onion");
		const radioIngredients = screen.getByTestId('ingredient-search-radio');
		const radioName = screen.getByTestId('name-search-radio');
		const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
		expect(radioIngredients).toBeInTheDocument();
		expect(radioName).toBeInTheDocument();
		expect(radioFirstLetter).toBeInTheDocument();
		const execSearch = screen.getByTestId('exec-search-btn');
		userEvent.click(execSearch);
		userEvent.click(radioIngredients);
		userEvent.click(execSearch);
		userEvent.click(radioName);
		userEvent.click(execSearch);
		userEvent.click(radioFirstLetter);
		userEvent.click(execSearch);
		const inputSearch1 = screen.queryByTestId('search-input');
		userEvent.click(search);
		expect(inputSearch1).not.toBeInTheDocument();
		userEvent.click(profile);
		const {pathname} = history.location;
		expect(pathname).toBe("/profile");
	})


	test('Verifica elementos do header na tela drinks', () => {
		const { history } = renderWithRouter(<App />, "/drinks");
		const titulo = screen.getByRole('heading', { name: /drinks/i });
		expect(titulo).toBeInTheDocument();
		const profile = screen.getByTestId('profile-top-btn');
		const search = screen.getByTestId('search-top-btn');
		expect(profile).toBeInTheDocument();
		expect(search).toBeInTheDocument();
		userEvent.click(search);
		const inputSearch = screen.getByTestId('search-input');
		expect(inputSearch).toBeInTheDocument();
		userEvent.type(inputSearch,"onion");
		expect(inputSearch).toHaveValue("onion");
		const radioIngredients = screen.getByTestId('ingredient-search-radio');
		const radioName = screen.getByTestId('first-letter-search-radio');
		const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
		expect(radioIngredients).toBeInTheDocument();
		expect(radioName).toBeInTheDocument();
		expect(radioFirstLetter).toBeInTheDocument();
		const execSearch = screen.getByTestId('exec-search-btn');
		userEvent.click(execSearch);
		const inputSearch1 = screen.queryByTestId('search-input');
		userEvent.click(search);
		expect(inputSearch1).not.toBeInTheDocument();
		userEvent.click(profile);
		const {pathname} = history.location;
		expect(pathname).toBe("/profile");
	})
});