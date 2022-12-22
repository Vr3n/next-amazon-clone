import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // state.items = state.items.filter((item) => action.payload !== item.id);
      console.log(action.payload);
      const itemIdx = state.items.findIndex(
        (item) => action.payload === item.id
      );
      console.log(itemIdx);
      const newItems = [...state.items];

      if (itemIdx >= 0) {
        newItems.splice(itemIdx, 1);
      } else {
        console.warn("Cant remove payload, item doesn't exist!");
      }

      state.items = newItems;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how er pull information from the global store slice.
export const selectItems = (state: { basket: { items: [] } }) =>
  state.basket.items;

export const selectTotal = (state: { basket: { items: [] } }) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
