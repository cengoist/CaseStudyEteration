import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { fetchProductsSuccess } from '../../redux/slices/productsSlice';
import ProductList from "./index.tsx";

describe('ProductListScreen', () => {
  it('should render a list of products', async () => {
    const products = [
      { id: '1', name: 'Product 1', description: 'Description 1' },
      { id: '2', name: 'Product 2', description: 'Description 2' },
    ];

    store.dispatch(fetchProductsSuccess(products));

    render(
      <Provider store={store}>
        <ProductList navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeTruthy();
      expect(screen.getByText('Product 2')).toBeTruthy();
    });
  });
});
