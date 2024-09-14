import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { wishlistApi } from "./wishlistApi";
import cartApi from "./cartApi";
import AddressApi from "./AddressApi";

//* slices -------------------------------------------------------------------------------------------
//& isUser

//& sidebar
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { type: "" },
  reducers: {
    toggle(state, action) {
      state.type = action.payload;
    },
  },
});
//& popup
const popupSlice = createSlice({
  name: "popup",
  initialState: { type: "" },
  reducers: {
    toggle(state, action) {
      state.type = action.payload;
    },
  },
});
//& user information
const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: { value: {} },
  reducers: {
    update(state, action) {
      state.value = { ...state.value, ...action.payload };
    },
    remove(state) {
      state.value = {};
    },
  },
});
//& products
const dataSlice = createSlice({
  name: "data",
  initialState: { value: {} },
  reducers: {
    update(state, action) {
      state.value = { ...state.value, ...action.payload };
    },
  },
});
//& wishlist
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { value: [] },
  reducers: {
    set(state, action) {
      state.value = action.payload;
    },
    add(state, action) {
      state.value = [...state.value, action.payload];
      // state.value.push(action.payload);
    },
    remove(state, action) {
      const filterWishlist = state.value.filter((id) => id !== action.payload);
      state.value = filterWishlist;
    },
  },
});
//& cart
const cartSlice = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {
    set(state, action) {
      state.value = action.payload;
    },
    add(state, action) {
      const index = state.value.findIndex(
        (cartItem) => cartItem.product === action.payload.product
      );

      if (index !== -1) {
        // If the object with the id is present, update its count
        const updatedCart = state.value;
        updatedCart[index].count = action.payload.count;
        state.value = updatedCart;
      } else {
        // If the object with the id is not present, add a new object
        state.value = [...state.value, action.payload];
        // state.value.push(action.payload);
      }
    },
    remove(state, action) {
      const cart = state.value.filter((item) => item.id !== action.payload);
      state.value = cart;
    },
    clearCart(state) {
      state.value = [];
    },
  },
});

//* store configuration --------------------------------------------------------------------------------
const persistConfig = {
  key: "root",
  storage,
  blacklist: ['cartItems', 'Wishlist',"addresses"],
};


const rootReducer = combineReducers({
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer, [AddressApi.reducerPath]: AddressApi.reducer,
  sidebar: sidebarSlice.reducer,
  popup: popupSlice.reducer,
  userInfo: userInfoSlice.reducer,
  data: dataSlice.reducer,
  wishlist: wishlistSlice.reducer,
  cart: cartSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(cartApi.middleware, wishlistApi.middleware , AddressApi.middleware), // Add RTK-Query middleware here
});
export const persistor = persistStore(store);

//* actions exports --------------------------------------------------------------------------------
export const sidebarActions = sidebarSlice.actions;
export const popupActions = popupSlice.actions;
export const userInfoActions = userInfoSlice.actions;
export const dataActions = dataSlice.actions;
export const wishlistActions = wishlistSlice.actions;
export const cartActions = cartSlice.actions;

// export default store;
