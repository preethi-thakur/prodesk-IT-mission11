# 🚀 Quick Reference Guide

## Installation & Running

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your OMDB API key to .env.local

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Run production server
npm start

# Linting
npm run lint
```

---

## Project Structure at a Glance

```
app/                    ← Next.js App Router
├── page.jsx           ← Home page
├── layout.jsx         ← Root layout
├── globals.css        ← Global styles
└── movie/[id]/page.jsx ← Movie details page

components/            ← React components
├── Navbar.jsx         ← Search
├── MovieCard.jsx      ← Movie card
├── MovieModal.jsx     ← Details modal
├── MovieGallery.jsx   ← Infinite scroll
└── MovieDetailClient.jsx ← Detail page logic

lib/
└── omdb.js           ← API functions

public/               ← Static files
```

---

## Server vs Client Components

### When to Use Server Components

✅ **Use Server Component** when:
- Fetching data from API
- Using secret API keys
- Accessing databases
- Rendering metadata
- Doing heavy computations

```jsx
// ✅ Good - Server Component (app/movie/[id]/page.jsx)
export async function generateMetadata({ params }) {
  const movie = await getMovieDetails(params.id)
  return { title: movie.Title }
}

export default async function Page() {
  const movie = await getMovieDetails(params.id)
  return <MovieDetailClient initialMovie={movie} />
}
```

### When to Use Client Components

✅ **Use Client Component** when:
- Using hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- Need interactivity
- Real-time updates

```jsx
// ✅ Good - Client Component ('use client' directive)
'use client'

import { useState } from 'react'

export default function Navbar() {
  const [search, setSearch] = useState('')  // ← Needs 'use client'
  
  return (
    <input 
      onChange={(e) => setSearch(e.target.value)}  // ← Event handler
    />
  )
}
```

---

## Environment Variables

**Setup:**
```bash
# Create file
cp .env.example .env.local

# Add your API key
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

**Usage:**
```javascript
// Accessible from browser (public)
console.log(process.env.NEXT_PUBLIC_OMDB_API_KEY)

// ✅ Correct: Public variable prefixed with NEXT_PUBLIC_
// ❌ Wrong: OMDB_API_KEY=secret (not accessible)
```

---

## Common Tasks

### Add a New Page

```bash
# Create directory structure
mkdir -p app/reviews

# Create page
# app/reviews/page.jsx
export default function ReviewsPage() {
  return <div>Reviews page</div>
}

# Access at: http://localhost:3000/reviews
```

### Add a Dynamic Route

```bash
# Already created!
# app/movie/[id]/page.jsx

# Access at:
# http://localhost:3000/movie/tt0111161
# http://localhost:3000/movie/tt0068646
```

### Add a New Component

```jsx
// components/MyComponent.jsx
'use client'  // ← Add if using hooks

export default function MyComponent() {
  return <div>My Component</div>
}
```

### Use the API

```javascript
// lib/omdb.js (Server-side)
import { getMovieDetails, searchMovies } from '@/lib/omdb'

// Search movies
const results = await searchMovies('Marvel', 1)

// Get movie details
const movie = await getMovieDetails('tt0111161')
```

---

## Styling with Tailwind CSS

```jsx
// Use Tailwind classes directly
<div className="bg-slate-950 text-white rounded-xl p-4">
  <h1 className="text-3xl font-bold">Title</h1>
  <p className="text-slate-400">Description</p>
</div>

// Dark mode is default (dark color-scheme)
// Accent color is cyan (cyan-500)
// Grid layouts: grid-cols-2, grid-cols-4, grid-cols-6
```

---

## State Management

### Using localStorage

```jsx
'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'favorites'

export default function MyComponent() {
  const [favorites, setFavorites] = useState({})

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    setFavorites(stored ? JSON.parse(stored) : {})
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  return <div>Favorites: {Object.keys(favorites).length}</div>
}
```

### Using Context (Optional)

```jsx
// lib/FavoritesContext.jsx
'use client'

import { createContext, useState } from 'react'

export const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState({})
  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// Usage in layout
// import { FavoritesProvider } from '@/lib/FavoritesContext'
// <FavoritesProvider>{children}</FavoritesProvider>
```

---

## Debugging

### Check Environment Variables

```bash
# In browser console
console.log(process.env.NEXT_PUBLIC_OMDB_API_KEY)

# Check if undefined → variable not set or typo
```

### Check localStorage

```bash
# In browser console
localStorage.getItem('favorites')  // See saved data
localStorage.clear()               // Clear all
localStorage.removeItem('favorites') # Clear one key
```

### Check Build Errors

```bash
# See detailed errors
npm run build

# Clear cache and rebuild
rm -rf .next
npm run build
```

### Enable Debug Logging

```jsx
// Add to any component
if (typeof window !== 'undefined') {
  console.log('Running on client')
}

// In Server Component
console.log('Running on server')
```

---

## Performance Tips

### Image Optimization
```jsx
// ✅ Use Image component (optional)
import Image from 'next/image'

// But for now, regular img tags work fine:
<img src={url} alt="title" loading="lazy" />
```

### Code Splitting
```jsx
// ✅ Dynamic imports
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/Heavy'))

// Lazy loads only when needed
```

### Caching
```javascript
// Server-side API caching
fetch(url, { next: { revalidate: 3600 } })  // 1 hour cache
```

---

## Deployment Quick Commands

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel (one-click)
vercel deploy
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Pages | `/app/[name]/page.jsx` | `/app/movie/[id]/page.jsx` |
| Layouts | `/app/[name]/layout.jsx` | `/app/layout.jsx` |
| Components | PascalCase, `.jsx` | `MovieCard.jsx` |
| Utils | lowercase, `.js` | `omdb.js` |
| Styles | CSS/Tailwind | `globals.css` |

---

## Common Errors & Solutions

### "Cannot find module '@/lib/omdb'"
✅ **Solution:** Check `jsconfig.json` has `@/*` alias

### "API key not working"
✅ **Solution:** 
- Restart dev server after changing `.env.local`
- Check variable name: `NEXT_PUBLIC_OMDB_API_KEY`
- Verify API key is valid

### "Port 3000 already in use"
✅ **Solution:** `npm run dev -- -p 3001`

### "Build fails with memory error"
✅ **Solution:** `NODE_OPTIONS=--max-old-space-size=2048 npm run build`

---

## Useful Links

- 📖 [Next.js Docs](https://nextjs.org/docs)
- ⚛️ [React Docs](https://react.dev)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🎬 [OMDB API](http://www.omdbapi.com)
- 🚀 [Vercel Deploy](https://vercel.com)

---

## Next.js Routing Examples

```
File Structure          →  URL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app/page.jsx            →  /
app/about/page.jsx      →  /about
app/blog/[id]/page.jsx  →  /blog/123
app/api/route.js        →  /api (API routes)
app/[...slug]/page.jsx  →  /any/deep/path
```

---

## Tips for Development

1. **Hot Reload:** Changes auto-reload during development
2. **Fast Refresh:** Preserves component state on edits
3. **TypeScript:** Optional - works with JavaScript
4. **API Routes:** Can create `/app/api/` if needed
5. **Static Export:** Can export as static HTML if needed

---

## Before Going to Production

- [ ] Test all features locally
- [ ] Run `npm run build` successfully
- [ ] Check for console warnings/errors
- [ ] Test on mobile devices
- [ ] Set up environment variables on hosting
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS
- [ ] Set up monitoring (optional)

---

**Happy coding! 🎉**

For more details, see:
- README.md - Overview
- MIGRATION.md - Detailed migration guide
- DEPLOYMENT.md - Deployment instructions
- ARCHITECTURE.md - Complete architecture
