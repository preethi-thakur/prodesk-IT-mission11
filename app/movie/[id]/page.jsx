/**
 * Dynamic Movie Detail Page
 * SERVER COMPONENT - Handles movie details fetched server-side
 * 
 * Why SERVER:
 * - Fetches movie details on the server for SEO
 * - Generates metadata dynamically using generateMetadata()
 * - Pre-renders with full data on the server
 * - Better performance and SEO optimization
 */

import { getMovieDetails } from '@/lib/omdb'
import MovieDetailClient from '@/components/MovieDetailClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { id } = await params
  const movie = await getMovieDetails(id)

  if (!movie || movie.Response === 'False') {
    return {
      title: 'Movie Not Found',
      description: 'The movie you are looking for could not be found.',
    }
  }

  return {
    title: `${movie.Title} | Movie Explorer`,
    description: movie.Plot || `Discover details about ${movie.Title} on Movie Explorer.`,
    keywords: [movie.Title, 'movie', 'review', 'rating', movie.Genre],
    openGraph: {
      title: `${movie.Title}`,
      description: movie.Plot,
      type: 'video.movie',
      image: movie.Poster !== 'N/A' ? movie.Poster : '/og-image.png',
    },
  }
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params
  const movie = await getMovieDetails(id)

  if (!movie || movie.Response === 'False') {
    notFound()
  }

  return <MovieDetailClient initialMovie={movie} />
}
