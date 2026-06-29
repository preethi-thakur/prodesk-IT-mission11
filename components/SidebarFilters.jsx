'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import {
  setSearchQuery,
  setGenre,
  setYear,
  setType,
  setSortBy,
  setSortOrder,
  clearFilters,
} from '@/store/slices/filterSlice'

const GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Animation',
  'Adventure',
  'Fantasy',
  'Romance',
  'Mystery',
  'Crime',
  'Biography',
  'History',
  'War',
]

const YEARS = Array.from(
  { length: 35 },
  (_, i) => new Date().getFullYear() - i
)

const TYPES = ['Movie', 'Series', 'Episode']

const SORT_OPTIONS = ['title', 'year']

export default function SidebarFilters() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)

  const handleSearchChange = useCallback(
    (e) => {
      dispatch(setSearchQuery(e.target.value))
    },
    [dispatch]
  )

  const handleGenreChange = useCallback(
    (e) => {
      dispatch(setGenre(e.target.value))
    },
    [dispatch]
  )

  const handleYearChange = useCallback(
    (e) => {
      dispatch(setYear(e.target.value))
    },
    [dispatch]
  )

  const handleTypeChange = useCallback(
    (e) => {
      dispatch(setType(e.target.value))
    },
    [dispatch]
  )

  const handleSortByChange = useCallback(
    (e) => {
      dispatch(setSortBy(e.target.value))
    },
    [dispatch]
  )

  const handleSortOrderChange = useCallback(
    (e) => {
      dispatch(setSortOrder(e.target.value))
    },
    [dispatch]
  )

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters())
  }, [dispatch])

  return (
    <aside className="w-full md:w-72 bg-slate-900 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Filters</h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search movies..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 bg-slate-800 text-white placeholder-gray-400 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-2">
            Genre
          </label>
          <select
            id="genre"
            value={filters.selectedGenre}
            onChange={handleGenreChange}
            className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="">All Genres</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-2">
            Year
          </label>
          <select
            id="year"
            value={filters.selectedYear}
            onChange={handleYearChange}
            className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="">All Years</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
            Type
          </label>
          <select
            id="type"
            value={filters.selectedType}
            onChange={handleTypeChange}
            className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="">All Types</option>
            {TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-300 mb-2">
              Sort By
            </label>
            <select
              id="sortBy"
              value={filters.sortBy}
              onChange={handleSortByChange}
              className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-300 mb-2">
              Order
            </label>
            <select
              id="sortOrder"
              value={filters.sortOrder}
              onChange={handleSortOrderChange}
              className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleClearFilters}
          className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  )
}
