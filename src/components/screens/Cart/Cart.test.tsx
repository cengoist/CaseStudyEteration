import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from '../Cart/index.tsx';
import {removeFromCart, updateQuantity} from '../../redux/slices/cartSlice';

const mockStore = configureStore([]);
const cartItems = [
  {id: '1', name: 'Product 1', price: '10.00', quantity: 1},
  {id: '2', name: 'Product 2', price: '20.00', quantity: 2},
];

describe('Cart', () => {
  let store: any;
  let component: any;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: cartItems,
      },
    });

    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );
  });

  it('renders correctly', () => {
    expect(component).toBeDefined();
  });

  it('displays the correct total', () => {
    const totalText = component.getByText('Total: 50.00 ₺');
    expect(totalText).toBeDefined();
  });

  it('calls removeFromCart action when remove button is pressed', () => {
    const removeButton = component.getAllByRole('button')[0];
    fireEvent.press(removeButton);
    expect(store.dispatch).toHaveBeenCalledWith(removeFromCart('1'));
  });

  it('calls updateQuantity action when + button is pressed', () => {
    const addButton = component.getAllByRole('button')[2];
    fireEvent.press(addButton);
    expect(store.dispatch).toHaveBeenCalledWith(
      updateQuantity({id: '2', quantity: 3}),
    );
  });

  it('calls updateQuantity action when - button is pressed', () => {
    const minusButton = component.getAllByRole('button')[1];
    fireEvent.press(minusButton);
    expect(store.dispatch).toHaveBeenCalledWith(
      updateQuantity({id: '2', quantity: 1}),
    );
  });

  it('calls removeFromCart action when quantity is 1 and - button is pressed', () => {
    const minusButton = component.getAllByRole('button')[0];
    fireEvent.press(minusButton);
    expect(store.dispatch).toHaveBeenCalledWith(removeFromCart('1'));
  });
});
