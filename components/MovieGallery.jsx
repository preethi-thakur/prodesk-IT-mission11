import { useEffect, useRef } from 'react'
import MovieCard from './MovieCard'

export default function MovieGallery({ movies, favorites, onToggleFavorite }) {
  const observerRef = useRef(null)

  useEffect(() => {
    const currentElement = observerRef.current
    if (!currentElement) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load more logic here
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
      }
    )

    observer.observe(currentElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={!!favorites[movie.imdbID]}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
      <div ref={observerRef} className="col-span-full h-1" />
    </div>
  )
}