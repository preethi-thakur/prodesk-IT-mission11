import Image from 'next/image'
import { getImageUrl } from '@/lib/omdb'

export default function MovieModal({ movie, onClose, onToggleFavorite, isFavorite }) {
  if (!movie) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-slate-900 p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-white hover:text-slate-400"
        >
          ✕
        </button>
        
        <Image
          src={getImageUrl(movie.Poster)}
          alt={movie.Title}
          width={300}
          height={450}
          className="mx-auto mb-4 rounded-xl object-cover"
        />
        
        <h2 className="mb-2 text-2xl font-bold text-white">{movie.Title}</h2>
        <p className="mb-1 text-slate-400">{movie.Year} • {movie.Rated}</p>
        <p className="mb-4 text-slate-300">{movie.Plot}</p>
        
        <button
          onClick={() => onToggleFavorite(movie)}
          className="rounded-xl bg-cyan-500 px-6 py-2 font-semibold text-white hover:bg-cyan-400"
        >
          {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>
    </div>
  )
}