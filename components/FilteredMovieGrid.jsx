import { useEffect, useRef } from 'react'
import MovieCard from './MovieCard'

export default function FilteredMovieGrid({
  initialMovies = [],
  favorites = {},
  onToggleFavorite,
  onMovieClick,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}) {
  const observerRef = useRef(null)

  useEffect(() => {
    const current = observerRef.current

    if (!current || !hasMore || isLoadingMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && onLoadMore) {
          onLoadMore()
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.1,
      }
    )

    observer.observe(current)

    return () => observer.disconnect()
  }, [hasMore, isLoadingMore, onLoadMore])

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {initialMovies.map((movie) => (
        <MovieCard
  key={movie.imdbID}
  movie={movie}
  isFavorite={!!favorites[movie.imdbID]}
  onToggleFavorite={onToggleFavorite}
  onClick={onMovieClick}
/>
      ))}

      {hasMore && !isLoadingMore && (
        <div
          ref={observerRef}
          className="col-span-full h-1"
        />
      )}
    </div>
  )
}
