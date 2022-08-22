import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { act } from 'react-dom/test-utils';

const localStorageMock = (() => {
  let store = {
		user:'{"user":"andré@gmail.com"}',
	};

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

describe('verifica se Header renderiza corretamente', () => {
	test('Verifica elementos do header na tela foods', async() => {
		const { history } = renderWithRouter(<App />, "/foods");
		global.alert = jest.fn((msg) => msg);
		const titulo = screen.getByRole('heading', { name: /foods/i });
		const profile = screen.getByTestId('profile-top-btn');
		const search = screen.getByTestId('search-top-btn');
		expect(titulo).toBeInTheDocument();
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
		const execSearch = screen.getByTestId('exec-search-btn');
		expect(radioIngredients).toBeInTheDocument();
		expect(radioName).toBeInTheDocument();
		expect(radioFirstLetter).toBeInTheDocument();
		expect(execSearch).toBeInTheDocument();
		await act(async() => {
			await userEvent.click(radioIngredients);
			await userEvent.click(execSearch);

			await userEvent.click(radioName);
			await userEvent.click(execSearch);
			
			await userEvent.click(radioFirstLetter);
			await userEvent.click(execSearch);
		});

		const inputSearch1 = screen.queryByTestId('search-input');
		userEvent.click(search);
		expect(inputSearch1).not.toBeInTheDocument();
		userEvent.click(profile);
		const {pathname} = history.location;
		expect(pathname).toBe("/profile");
	})


	test('Verifica elementos do header na tela drinks', () => {
		const { history } = renderWithRouter(<App />, "/drinks");
		global.alert = jest.fn((msg) => msg);
		const titulo = screen.getByRole('heading', { name: /drinks/i });
		const profile = screen.getByTestId('profile-top-btn');
		const search = screen.getByTestId('search-top-btn');
		expect(titulo).toBeInTheDocument();
		expect(profile).toBeInTheDocument();
		expect(search).toBeInTheDocument();
		userEvent.click(search);

		const inputSearch = screen.getByTestId('search-input');
		expect(inputSearch).toBeInTheDocument();
		userEvent.type(inputSearch,"ice");
		expect(inputSearch).toHaveValue("ice");
		const radioIngredients = screen.getByTestId('ingredient-search-radio');
		const radioName = screen.getByTestId('name-search-radio');
		const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
		const execSearch = screen.getByTestId('exec-search-btn');
		expect(radioIngredients).toBeInTheDocument();
		expect(radioName).toBeInTheDocument();
		expect(radioFirstLetter).toBeInTheDocument();
		expect(execSearch).toBeInTheDocument();
		userEvent.click(radioIngredients);
		userEvent.click(execSearch);

		const inputSearch1 = screen.queryByTestId('search-input');
		userEvent.click(search);
		expect(inputSearch1).not.toBeInTheDocument();
		userEvent.click(profile);
		const {pathname} = history.location;
		expect(pathname).toBe("/profile");
	})

	test('Verifica se ao pesquisar um item em especifico, é redirecionado para a tela da receita', async () => {
		const { history } = renderWithRouter(<App />, "/drinks");
		const search = screen.getByTestId('search-top-btn');
		expect(search).toBeInTheDocument();
		userEvent.click(search);

		const inputSearch = screen.queryByTestId('search-input');
		const radioName = screen.getByTestId('name-search-radio');
		const execSearch = screen.getByTestId('exec-search-btn');
		// const execSearch = screen.getByRole('button', { name: "Search" });
		expect(inputSearch).toBeInTheDocument();
		userEvent.type(inputSearch,"Aquamarine");
		expect(inputSearch).toHaveValue("Aquamarine");
		userEvent.click(radioName);
		// waitForElementToBeRemoved(screen.queryByTestId('search-input'), {timeout: 4000});
		// expect(execSearch).toHaveTextContent('abcd');
		userEvent.click(execSearch);
			// await screen.findByTestId('recipe-title', {timeout: 9000});
		// });
	
		// const {pathname} = history.location;
		// await waitFor(() => {
		// 	expect(pathname).toBe("/drinks/178319");
		// });
	})
});