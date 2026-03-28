'use client';

import { useEffect } from 'react';
import { store } from '@/redux/store';
import { Provider, useDispatch } from 'react-redux';
import { fetchCart } from '@/redux/features/cartSlice';

const CartInitializer = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  return children;
};

export const CartProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <CartInitializer>{children}</CartInitializer>
    </Provider>
  );
};
