'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import {
  setSearchQuery,
  setGenre,
  setYear,
  setType,
} from '@/store/slices/filterSlice'

export default function ActiveFilters() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)

  const activeFilters = [
    { key: 'searchQuery', value: filters.searchQuery, label: `Search: "${filters.searchQuery}"` },
    { key: 'selectedGenre', value: filters.selectedGenre, label: `Genre: ${filters.selectedGenre}` },
    { key: 'selectedYear', value: filters.selectedYear, label: `Year: ${filters.selectedYear}` },
    { key: 'selectedType', value: filters.selectedType, label: `Type: ${filters.selectedType}` },
  ].filter((filter) => filter.value)

  const handleRemoveFilter = useCallback(
    (filterKey) => {
      switch (filterKey) {
        case 'searchQuery':
          dispatch(setSearchQuery(''))
          break
        case 'selectedGenre':
          dispatch(setGenre(''))
          break
        case 'selectedYear':
          dispatch(setYear(''))
          break
        case 'selectedType':
          dispatch(setType(''))
          break
        default:
          break
      }
    },
    [dispatch]
  )

  if (activeFilters.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {activeFilters.map((filter) => (
        <div
          key={filter.key}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/50 border border-blue-700 text-blue-200 rounded-full text-sm"
        >
          <span>{filter.label}</span>
          <button
            onClick={() => handleRemoveFilter(filter.key)}
            className="text-blue-300 hover:text-blue-100 font-bold cursor-pointer transition-colors"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
