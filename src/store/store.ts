import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice.ts';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export { store };
export default store;
