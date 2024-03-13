import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shop: null,
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShop: (state, action) => {
      state.shop = action.payload;
    },
  },
});

// ======= Экспорты =======
export const { setShop } = shopSlice.actions;

// Стелекторы
export const selectShop = state => state.shop.shop;

export default shopSlice.reducer;
