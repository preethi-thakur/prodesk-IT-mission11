const API_BASE = 'https://www.omdbapi.com/'

export const buildUrl = (params) => {
  const searchParams = new URLSearchParams({
    apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY || '',
    r: 'json',
    ...params,
  })
  return `${API_BASE}?${searchParams}`
}

export const getImageUrl = (poster) => {
  if (!poster || poster === 'N/A') {
    // Return inline SVG as data URL
    return 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
        <rect width="500" height="750" fill="#1e293b"/>
        <rect x="50" y="50" width="400" height="650" rx="10" fill="#0f172a" stroke="#334155" stroke-width="2"/>
        <text x="250" y="340" font-family="Arial" font-size="60" fill="#475569" text-anchor="middle">🎬</text>
        <text x="250" y="400" font-family="Arial" font-size="22" fill="#64748b" text-anchor="middle">No Poster</text>
        <text x="250" y="430" font-family="Arial" font-size="14" fill="#475569" text-anchor="middle">Available</text>
      </svg>
    `)
  }
  return poster
}

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      buildUrl({
        s: query,
        type: 'movie',
        page,
      })
    )

    if (!response.ok) throw new Error('Failed to fetch movies')
    return await response.json()
  } catch (error) {
    console.error('Error searching movies:', error)
    return { Search: [], Response: 'False' }
  }
}

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      buildUrl({
        i: imdbID,
        plot: 'full',
      })
    )

    if (!response.ok) throw new Error('Failed to fetch movie details')
    return await response.json()
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}

export const getTrendingMovies = async () => {
  const data = await searchMovies('Marvel', 1)
  return data.Search || []
}