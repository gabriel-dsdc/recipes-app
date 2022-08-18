import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
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
	test('Verifica elementos do header na tela drinks', async () => {
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
		await waitFor(() => {
			expect(categorias).toHaveLength(6);
		});
		categorias.forEach(element => {
			userEvent.click(element);
		});
		userEvent.click(categorias[0]);
		const image1 = screen.getByTestId("0-card-img");
		userEvent.click(image1);
		const {pathname} = history.location;
		expect(pathname).toBe("/drinks/15997");
	}, 6000)

	test('Testa a busca de drinks e clica no perfil', () => {
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
		const radioIngredients = screen.getByTestId('ingredient-search-radio');
		const radioName = screen.getByTestId('first-letter-search-radio');
		const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
		const execSearch = screen.getByTestId('exec-search-btn');
		expect(inputSearch).toBeInTheDocument();
		expect(radioIngredients).toBeInTheDocument();
		expect(radioName).toBeInTheDocument();
		expect(radioFirstLetter).toBeInTheDocument();

		userEvent.type(inputSearch, "ice");
		expect(inputSearch).toHaveValue("ice");
		userEvent.click(radioIngredients);
		userEvent.click(execSearch);
		const inputSearch1 = screen.queryByTestId('search-input');
		userEvent.click(search);
		expect(inputSearch1).not.toBeInTheDocument();
		userEvent.click(profile);
		const {pathname} = history.location;
		expect(pathname).toBe("/profile");
	})

	test('Verifica se a pesquisa tiver 1 resultado irá para a tela de detalhes', () => {
		const { history } = renderWithRouter(<App />, "/foods");
		const search = screen.getByTestId('search-top-btn');
		userEvent.click(search);
		const radioName = screen.getByTestId('name-search-radio');
		const inputSearch = screen.getByTestId('search-input');
		userEvent.click(radioName);
		userEvent.type(inputSearch, 'Arrabiata');
		expect(screen.getByTestId('search-input')).toHaveValue('Arrabiata');
		const execSearch = screen.getByTestId('exec-search-btn');
		userEvent.click(execSearch);
	});

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
		expect(categorias).toHaveLength(6);
		categorias.forEach(element => {
			userEvent.click(element);
		});
		userEvent.click(categorias[1])
		userEvent.click(categorias[1])
	}, 6000)
});
