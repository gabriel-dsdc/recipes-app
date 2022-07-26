import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
// import Foods from '../pages/Foods';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
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

describe('verifica se as telas de receitas renderiza corretamente', () => {

	test('Verifica elementos do header na tela foods', async () => {
		const { history } = renderWithRouter(<App />, "/foods");
		const titulo = await screen.findByRole('heading', { name: /foods/i }, "", {timeout:3000});
		const view = await screen.findByTestId('0-recipe-card', "", {timeout:3000});

		await waitFor(
			() => expect(screen.getByTestId(/All/i)).toBeInTheDocument(),
			{ timeout: 3000 }
		);

		const categorias = await screen.findAllByTestId(/category-filter/, "", {timeout:3000});

		const profile = screen.getByTestId('profile-top-btn');
		const search = screen.getByTestId('search-top-btn');
		expect(profile).toBeInTheDocument();
		expect(search).toBeInTheDocument();
		expect(categorias).toHaveLength(6)
		categorias.forEach(element => {
			userEvent.click(element)
		});
		userEvent.click(categorias[0])
		userEvent.click(categorias[0])
	}, 6000)

	test('Verifica elementos do header na tela foods', async () => {
		const { history } = renderWithRouter(<App />, "/drinks");
		const titulo = await screen.findByRole('heading', { name: /drinks/i }, "", {timeout:3000});
		const view = await screen.findByTestId('0-recipe-card', "", {timeout:3000});
		await waitFor(
			() => expect(screen.getByTestId(/All/i)).toBeInTheDocument(),
			{ timeout: 3000 }
		);
		const categorias = await screen.findAllByTestId(/category-filter/, "", {timeout:3000});
		const profile = screen.getByTestId('profile-top-btn');
		const search = screen.getByTestId('search-top-btn');
		expect(profile).toBeInTheDocument();
		expect(search).toBeInTheDocument();
		expect(categorias).toHaveLength(6)
		categorias.forEach(element => {
			userEvent.click(element)
		});
		userEvent.click(categorias[0])
		userEvent.click(categorias[0])
		const image1 = screen.getByTestId("0-card-img");
		userEvent.click(image1)
		const {pathname} = history.location;
		expect(pathname).toBe("/drinks/15997");
	}, 6000)

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
