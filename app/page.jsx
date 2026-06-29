'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import SidebarFilters from '@/components/SidebarFilters'
import ActiveFilters from '@/components/ActiveFilters'
import FilteredMovieGrid from '@/components/FilteredMovieGrid'
import MovieModal from '@/components/MovieModal'
import MovieCard from '@/components/MovieCard'
import { setSearchQuery } from '@/store/slices/filterSlice'
import { searchMovies, getTrendingMovies, getMovieDetails, getImageUrl } from '@/lib/omdb'

const STORAGE_KEY = 'favorites'

const loadStoredFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export default function Home() {
  const dispatch = useDispatch()
  const reduxSearchQuery = useSelector((state) => state.filters.searchQuery)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState('Marvel')
  const [searchResults, setSearchResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const observerRef = useRef(null)
  const [favorites, setFavorites] = useState({})
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [activeTab, setActiveTab] = useState('movies')
  const [status, setStatus] = useState({ loading: false, message: '' })
  const [initialized, setInitialized] = useState(false)

  const debounceRef = useRef(null)

  useEffect(() => {
    setFavorites(loadStoredFavorites())
    setInitialized(true)
  }, [])

  useEffect(() => {
    const loadInitial = async () => {
      if (!initialized) return
      setStatus({ loading: true, message: '' })
      try {
        const movies = await getTrendingMovies()
        setSearchResults(movies)
        setStatus({ loading: false, message: '' })
      } catch (error) {
        setStatus({ loading: false, message: 'Failed to load movies.' })
      }
    }
    loadInitial()
  }, [initialized])

  useEffect(() => {
    clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      const value = searchTerm.trim()
      if (value.length >= 2) {
        setQuery(value)
        dispatch(setSearchQuery(value))
        setSearchResults([])
        setPage(1)
        setTotalResults(0)
        setIsLoadingMore(false)
      } else if (value.length === 0) {
        setQuery('Marvel')
        dispatch(setSearchQuery(''))
        setSearchResults([])
        setPage(1)
        setTotalResults(0)
        setIsLoadingMore(false)
      }
    }, 500)

    return () => clearTimeout(debounceRef.current)
  }, [searchTerm, dispatch])

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return
      if (isLoadingMore) return
      
      const totalPages = Math.ceil(totalResults / 10)
      if (totalResults > 0 && page > totalPages) return

      setIsLoadingMore(true)
      setStatus({ loading: true, message: '' })

      try {
        const data = await searchMovies(query, page)

        if (data.Response === 'False') {
          if (page === 1) {
            setSearchResults([])
            setTotalResults(0)
          }
          setStatus({
            loading: false,
            message: data.Error || 'No movies found.',
          })
          setIsLoadingMore(false)
          return
        }

        const movies = data.Search || []
        const total = parseInt(data.totalResults) || 0

        setSearchResults((prev) => {
          if (page === 1) return movies
          const existingIds = new Set(prev.map(m => m.imdbID))
          const newMovies = movies.filter(m => !existingIds.has(m.imdbID))
          return [...prev, ...newMovies]
        })

        setTotalResults(total)

        setStatus({
          loading: false,
          message: '',
        })
      } catch (error) {
        setStatus({
          loading: false,
          message: 'Failed to load movies.',
        })
      } finally {
        setIsLoadingMore(false)
      }
    }

    fetchResults()
  }, [query, page, isLoadingMore, totalResults])

  useEffect(() => {
    const currentElement = observerRef.current
    if (!currentElement) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        const totalPages = Math.ceil(totalResults / 10)
        if (firstEntry.isIntersecting && !isLoadingMore && !status.loading && page < totalPages) {
          setPage((prev) => prev + 1)
        }
      },
      {
        root: null,
        rootMargin: '400px',
        threshold: 0,
      }
    )

    observer.observe(currentElement)

    return () => {
      observer.disconnect()
    }
  }, [isLoadingMore, status.loading, page, totalResults])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = useCallback((movie) => {
    setFavorites((current) => {
      const next = { ...current }
      if (next[movie.imdbID]) {
        delete next[movie.imdbID]
      } else {
        next[movie.imdbID] = movie
      }
      return next
    })
  }, [])

 const openModal = async (movie) => {
  try {
    console.log('Movie clicked:', movie)

    const data = await getMovieDetails(movie.imdbID)

    console.log('Movie details:', data)

    if (data) {
      setSelectedMovie(data)
    } else {
      alert('Movie details not found')
    }
  } catch (error) {
    console.error('Modal Error:', error)
  }
}
  const closeModal = useCallback(() => setSelectedMovie(null), [])

  const favoriteCount = Object.keys(favorites).length
  const featuredMovie = searchResults[0]
  const totalPages = Math.ceil(totalResults / 10)
  const hasMore = totalResults > 0 && page < totalPages

  const favoriteMovies = Object.values(favorites)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Navbar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          favoriteCount={favoriteCount}
        />

        <div className="mb-8 flex gap-3">
          <button
            onClick={() => setActiveTab('movies')}
            className={`rounded-xl px-5 py-3 font-medium transition ${
              activeTab === 'movies'
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            🎬 Movies
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`rounded-xl px-5 py-3 font-medium transition ${
              activeTab === 'favorites'
                ? 'bg-red-500 text-white'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            ❤️ Favorites ({favoriteCount})
          </button>
        </div>

        {activeTab === 'movies' && (
          <>
            {featuredMovie && (
              <div className="relative mb-12 overflow-hidden rounded-3xl">
                <div className="relative h-[500px] w-full">
                  <img
                    src={getImageUrl(featuredMovie.Poster)}
                    alt={featuredMovie.Title}
                    className="h-[500px] w-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

                <div className="absolute left-10 top-1/2 max-w-xl -translate-y-1/2">
                  <p className="mb-3 text-cyan-400 font-medium">
                    Featured Movie
                  </p>

                  <h1 className="text-5xl md:text-6xl font-bold">
                    {featuredMovie.Title}
                  </h1>

                  <p className="mt-4 text-lg text-slate-300">
                    Released: {featuredMovie.Year}
                  </p>

                  <button
                    onClick={() => openModal(featuredMovie)}
                    className="mt-6 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-400"
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="mb-6 text-3xl font-bold">
                Movies
              </h2>

              <div className="flex flex-col gap-8 lg:flex-row">
                <SidebarFilters />

                <div className="flex-1">
                  <ActiveFilters />

                  {searchResults.length > 0 ? (
                    <>
                     <FilteredMovieGrid
  initialMovies={searchResults}
  favorites={favorites}
  onToggleFavorite={toggleFavorite}
  onMovieClick={openModal}
  hasMore={hasMore}
  isLoadingMore={isLoadingMore}
/>

                      {isLoadingMore && (
                        <div className="flex justify-center py-10">
                          <div className="flex items-center gap-3 text-slate-400">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
                            <span>Loading more movies...</span>
                          </div>
                        </div>
                      )}

                      {hasMore && !isLoadingMore && (
                        <div
                          ref={observerRef}
                          className="flex justify-center py-10"
                        >
                          <p className="text-slate-400">
                            Scroll for more movies
                          </p>
                        </div>
                      )}

                      {!hasMore && searchResults.length > 0 && (
                        <div className="flex justify-center py-10">
                          <p className="text-slate-500">
                            No more movies to load
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {status.message && !status.loading && (
                        <div className="rounded-2xl bg-slate-900 p-10 text-center text-slate-400">
                          {status.message}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="mb-8">
            <h2 className="mb-6 text-3xl font-bold">
              ❤️ Your Favorite Movies
            </h2>

            {favoriteMovies.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {favoriteMovies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                    onClick={() => openModal(movie)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-900 p-16 text-center">
                <p className="text-4xl mb-4">🎬</p>
                <p className="text-xl text-slate-400">
                  No favorite movies yet
                </p>
                <p className="text-slate-500 mt-2">
                  Start adding movies to your favorites!
                </p>
              </div>
            )}
          </div>
        )}

      {selectedMovie && (
  <MovieModal
    movie={selectedMovie}
    onClose={() => setSelectedMovie(null)}
    onToggleFavorite={toggleFavorite}
    isFavorite={!!favorites[selectedMovie.imdbID]}
  />
)}
      </div>
    </div>
  )
}
