import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchQuery: '',
  selectedGenre: '',
  selectedYear: '',
  selectedType: '',
  sortBy: 'title',
  sortOrder: 'asc',
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setGenre: (state, action) => {
      state.selectedGenre = action.payload
    },
    setYear: (state, action) => {
      state.selectedYear = action.payload
    },
    setType: (state, action) => {
      state.selectedType = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    clearFilters: (state) => {
      state.searchQuery = ''
      state.selectedGenre = ''
      state.selectedYear = ''
      state.selectedType = ''
      state.sortBy = 'title'
      state.sortOrder = 'asc'
    },
  },
})

export const {
  setSearchQuery,
  setGenre,
  setYear,
  setType,
  setSortBy,
  setSortOrder,
  clearFilters,
} = filterSlice.actions

export default filterSlice.reducer
