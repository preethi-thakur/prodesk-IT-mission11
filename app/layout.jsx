import './globals.css'
import { ReduxProvider } from '@/components/ReduxProvider'

export const metadata = {
  title: 'Movie Explorer | Discover and Save Your Favorite Movies',
  description:
    'Explore thousands of movies with detailed information, ratings, and reviews. Save your favorite movies to your personal collection.',
  keywords: ['movies', 'search', 'explorer', 'IMDB', 'favorites'],
  authors: [{ name: 'Movie Explorer Team' }],
  openGraph: {
    title: 'Movie Explorer',
    description: 'Discover and save your favorite movies',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
