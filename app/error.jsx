'use client'


import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4">⚠️</h1>
        <p className="text-2xl font-semibold mb-4">Something went wrong!</p>
        <p className="text-slate-400 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-400 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
