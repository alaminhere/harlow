'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  addToCartThunk,
  incrementThunk,
  decrementThunk,
  removeThunk,
  clearCartThunk,
} from '@/redux/features/cartSlice';
import { sendResponse } from '@/libs/sendResponse';

export const useCart = () => {
  const dispatch = useDispatch();
  const localCart = useSelector(state => state.cart.items);

  const run = async thunk => {
    const res = await dispatch(thunk);
    if (res.meta.requestStatus === 'rejected') {
      return sendResponse(false, res.payload || 'Something went wrong!');
    }
    return sendResponse(true, res.payload.message);
  };

  const addToCart = product => run(addToCartThunk(product));
  const increment = product => run(incrementThunk(product));
  const decrement = product => run(decrementThunk(product));
  const remove = product => run(removeThunk(product));
  const clearCart = () => run(clearCartThunk());

  return {
    increment,
    decrement,
    remove,
    clearCart,
    addToCart,
    localCart,
  };
};
