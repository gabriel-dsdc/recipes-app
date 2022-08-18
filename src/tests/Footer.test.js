import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Verifica os elementos do Footer', () => {
  test('Verifica as imagens do Footer', () => {
    renderWithRouter(<Footer />);
    const imgFood = screen.getByAltText(/food/i);
    const imgDrink = screen.getByAltText(/drink/i);
    expect(imgFood).toBeInTheDocument();
    expect(imgDrink).toBeInTheDocument();
  });
});
