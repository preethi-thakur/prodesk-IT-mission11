'use client'



import { useRef } from 'react'

export default function Navbar({ searchTerm, onSearch, favoriteCount }) {
  const debounceRef = useRef(null)

  const handleSearchChange = (e) => {
    const value = e.target.value
    onSearch(value)

  }

  return (
    <header className="sticky top-0 z-50 mb-8 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Movie Explorer
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Discover and save your favorite movies
          </p>
        </div>

        <div className="flex flex-col gap-3 md:w-[450px]">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search movies..."
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-cyan-500
            "
          />
        </div>
      </div>
    </header>
  )
}
