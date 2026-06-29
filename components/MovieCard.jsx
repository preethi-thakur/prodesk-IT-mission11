import Image from 'next/image'
import { getImageUrl } from '@/lib/omdb'

export default function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  onClick,
}) {
  return (
    <div
      onClick={() => onClick?.(movie)}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-800 transition hover:scale-105 hover:shadow-xl"
    >
      <Image
        src={getImageUrl(movie.Poster)}
        alt={movie.Title}
        width={500}
        height={750}
        className="h-[300px] w-full object-cover"
      />

      <div className="p-4">
        <h3 className="truncate font-semibold text-white">
          {movie.Title}
        </h3>

        <p className="text-sm text-slate-400">
          {movie.Year}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite(movie)
        }}
        className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-2xl transition hover:bg-black/70"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  )
}
