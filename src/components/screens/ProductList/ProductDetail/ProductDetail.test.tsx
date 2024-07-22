import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { fetchProductsSuccess } from '../../../redux/slices/productsSlice';
import ProductDetail from "./index.tsx";

describe('ProductDetailScreen', () => {
  it('should render product details and handle add to cart', () => {
    const product = { id: '1', name: 'Product 1', description: 'Description 1' };
    store.dispatch(fetchProductsSuccess([product]));

    const route = { params: { productId: '1' } };

    render(
      <Provider store={store}>
        <ProductDetail route={route} />
      </Provider>
    );

    expect(screen.getByText('Product 1')).toBeTruthy();
    expect(screen.getByText('Description 1')).toBeTruthy();

    fireEvent.press(screen.getByText('Add to Cart'));

    const cartItems = store.getState().cart.items;
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].id).toBe('1');
  });
});
