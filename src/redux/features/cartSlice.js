import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentCart, submitCart } from '@/actions/cartAction';
import { CART_CONSTANTS, isSame } from '@/libs/cartConstants';

const createCartThunk = (name, action) =>
  createAsyncThunk(`cart/${name}`, async (product, { rejectWithValue }) => {
    const res = await submitCart(action, product);
    if (!res.success) return rejectWithValue(res.message);
    return { product, message: res.message };
  });

//  fetch cart from server
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    const res = await getCurrentCart();
    if (!res.success) return rejectWithValue(res.message);
    return res.data || [];
  },
);
export const addToCartThunk = createCartThunk('addToCart', CART_CONSTANTS.ADD);
export const incrementThunk = createCartThunk('increment', CART_CONSTANTS.INC);
export const decrementThunk = createCartThunk('decrement', CART_CONSTANTS.DEC);
export const removeThunk = createCartThunk('remove', CART_CONSTANTS.DEL);
export const clearCartThunk = createCartThunk('clear', CART_CONSTANTS.CLEAR);

const upsert = (state, action) => {
  const { product } = action.payload;
  const item = state.items.find(i => isSame(i, product.product));

  if (item) {
    item.quantity += 1;
  } else {
    const qty = Number(product.quantity);
    state.items.push({ ...product, quantity: qty > 0 ? qty : 1 });
  }
};
const decItem = (state, action) => {
  const item = state.items.find(i => isSame(i, action.payload.product.product));
  if (item) item.quantity -= 1;
};
const removeItem = (state, action) => {
  state.items = state.items.filter(
    i => !isSame(i, action.payload.product.product),
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isLoading: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCart.rejected, state => {
        state.isLoading = false;
      })
      .addCase(addToCartThunk.fulfilled, upsert)
      .addCase(incrementThunk.fulfilled, upsert)
      .addCase(decrementThunk.fulfilled, decItem)
      .addCase(removeThunk.fulfilled, removeItem)
      .addCase(clearCartThunk.fulfilled, state => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
