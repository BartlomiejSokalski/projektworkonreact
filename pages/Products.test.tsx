import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';
import { CartProvider } from '../CartContext';

test('wyświetla listę produktów', () => {
  render(
    <CartProvider>
      <Products />
    </CartProvider>
  );

  expect(screen.getByText(/Karma dla psa/i)).toBeInTheDocument();
  expect(screen.getByText(/29,99 zł/i)).toBeInTheDocument();
});

test('filtruje produkty po nazwie', () => {
  render(
    <CartProvider>
      <Products />
    </CartProvider>
  );

  const input = screen.getByPlaceholderText(/Szukaj produktu/i);
  fireEvent.change(input, { target: { value: 'piłka' } });

  expect(screen.getByText(/Piłka dla psa/i)).toBeInTheDocument();
  expect(screen.queryByText(/Karma dla psa/i)).toBeNull();
});
