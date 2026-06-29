import Image from 'next/image'
import { getImageUrl } from '@/lib/omdb'

export default function MovieDetailClient({ movie, initialMovie }) {
  const currentMovie = movie ?? initialMovie

  if (!currentMovie) {
    return (
      <div className="container mx-auto px-4 py-8 text-white">
        <p>Movie details are unavailable right now.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <Image
          src={getImageUrl(currentMovie.Poster)}
          alt={currentMovie.Title || 'Movie poster'}
          width={400}
          height={600}
          className="rounded-xl object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold text-white">{currentMovie.Title}</h1>
          <p className="text-slate-400">{currentMovie.Year} • {currentMovie.Rated}</p>
          <p className="mt-4 text-slate-300">{currentMovie.Plot}</p>
        </div>
      </div>
    </div>
  )
}