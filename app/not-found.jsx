
import Link from 'next/link'

export const metadata = {
  title: '404 - Page Not Found | Movie Explorer',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl font-semibold mb-4">Page Not Found</p>
        <p className="text-slate-400 mb-8">
          The page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-400 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
