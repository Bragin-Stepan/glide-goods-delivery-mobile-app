import { createSlice, createSelector } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      let newCart = [...state.items];
      let itemIndex = state.items.findIndex(
        item => item.id == action.payload.id
      );

      itemIndex >= 0 ? newCart.splice(itemIndex, 1) : null;

      state.items = newCart;
    },
  },
});

// ======= Экспорты =======
export const { addToCart, removeFromCart } = cartSlice.actions;

// ======= Селекторы =======
export const selectCartItems = state => state.cart.items;

// Фильтрует элементы корзины по id
export const selectCartItemsById = createSelector(
  [selectCartItems, (_, id) => id],
  (items, id) => items.filter(item => item.id == id)
);

// Вычисляет общую цену
export const selectCartTotal = state =>
  state.cart.items.reduce((total, item) => (total = total + item.price), 0);

export default cartSlice.reducer;
