import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movieId = action.payload
      if (state[movieId]) {
        delete state[movieId]
      } else {
        state[movieId] = true
      }
    },
    setFavorites: (state, action) => {
      return action.payload
    },
  },
})

export const { toggleFavorite, setFavorites } = favoriteSlice.actions

export default favoriteSlice.reducer
