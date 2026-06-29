import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import movieReducer from './slices/movieSlice'
import favoriteReducer from './slices/favoriteSlice'

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    movies: movieReducer,
    favorites: favoriteReducer,
  },
})
