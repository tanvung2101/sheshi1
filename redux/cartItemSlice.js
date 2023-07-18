import { createSlice } from "@reduxjs/toolkit";

const items = [];
const cartInfomation = {};

const initialState = {
  value: items,
  information: cartInfomation,
};

const cartItemSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      // console.log(newItem)
      const duplicate = state.value.filter(
        (e) =>
          e.slug === newItem?.slug &&
          e.capacityId === newItem?.capacityId &&
          e.unitId === newItem?.unitId
      );
      if (duplicate.length > 0) {
        state.value = state.value.filter(
          (e) =>
            e.slug !== newItem.slug ||
            e.capacityId !== newItem.capacityId ||
            e.unitId !== newItem.unitId
        );
        state.value = [
          ...state.value,
          {
            id: duplicate[0].id,
            slug: newItem.slug,
            capacityId: newItem.capacityId,
            unitId: newItem.unitId,
            price: newItem.price,
            quantity: newItem.quantity + duplicate[0].quantity,
            capacity: newItem.capacity,
            totalQuantity: newItem.totalQuantity,
            product: newItem.product,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...action.payload,
            id:
              state.value.length > 0
                ? state.value[state.value.length - 1].id + 1
                : 1,
          },
        ];
      }
      state.value.sort((a, b) => a.id > b.id)
      // localStorage.setItem(
      //   "cartItems",
      //   JSON.stringify(state.value.sort((a, b) => a.id > b.id))
      // );
    },
    updateItem: (state, { payload }) => {
      const item = payload;
      const updateItem = state.value.filter((a) =>
        a.slug === item.slug &&
        a.capacityId === item.capacityId &&
        a.unitId === item.unitId
      )
      if (updateItem.length > 0) {
        state.value = state.value.filter((e) =>
          e.slug !== item.slug ||
          e.capacityId !== item.capacityId ||
          e.unitId !== item.unitId
        )
        state.value = [
          ...state.value,
          {
            capacity: item.capacity,
            capacityId: item.capacityId,
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            slug: item.slug,
            totalQuantity: item.totalQuantity,
            unitId: item.unitId,
            product: item.product,
          },
        ]
      }
      // localStorage.setItem(
      //   "cartItems",
      //   JSON.stringify(
      state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
      //   )
      // );
    },
    removeItem: (state, action) => {
      const cartItem = action.payload;
      state.value = state.value.filter(
        (item) =>
          item.capacityId !== cartItem.capacityId ||
          item.unitId !== cartItem.unitId ||
          item.slug !== cartItem.slug
      );
      state.value.sort((a, b) => a.id > b.id)
      // localStorage.setItem(
      //   "cartItems",
      //   JSON.stringify(state.value.sort((a, b) => a.id > b.id))
      // );
    },
    addInformation: (state, action) => {
      const newInformation = action.payload;
      state.information = newInformation;
      localStorage.setItem("cartInfomation", JSON.stringify(state.information));
    },
    deleteAll: (state, action) => {
      state.value = [];
      state.information = {}
    }
  },
});

export const { addItem, removeItem, updateItem, addInformation, deleteAll } = cartItemSlice.actions;

export default cartItemSlice.reducer;
