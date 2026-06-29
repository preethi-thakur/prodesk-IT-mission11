# Movie Explorer - Next.js 15 Migration Guide

## 📋 Migration Summary

This document outlines the complete migration of the Movie Explorer application from **React + Vite** to **Next.js 15 App Router**.

---

## 🏗️ Project Structure

```
movieexplorer/
├── app/
│   ├── movie/
│   │   └── [id]/
│   │       └── page.jsx          # Dynamic movie detail page (Server Component)
│   ├── globals.css               # Global styles
│   ├── layout.jsx                # Root layout (Server Component)
│   ├── not-found.jsx             # 404 page (Server Component)
│   └── page.jsx                  # Home page (Client Component)
│
├── components/
│   ├── MovieCard.jsx             # Movie card with favorite toggle (Client)
│   ├── MovieDetailClient.jsx     # Movie detail page client logic (Client)
│   ├── MovieGallery.jsx          # Infinite scroll gallery (Client)
│   ├── MovieModal.jsx            # Movie details modal (Client)
│   └── Navbar.jsx                # Search bar (Client)
│
├── lib/
│   └── omdb.js                   # OMDB API utility functions (Server)
│
├── public/                       # Static assets
├── .env                          # Environment variables (local)
├── .env.example                  # Environment template
├── .eslintrc.json                # ESLint configuration
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # This file
```

---

## 🔄 Key Changes from Vite to Next.js 15

### 1. **Routing**
| Vite | Next.js 15 |
|------|-----------|
| SPA with client-side routing | File-based App Router |
| All routes in single App.jsx | Routes in app/ directory |
| No dynamic route params | `[id]` dynamic segments |

**Example:**
- **Before:** `useRouter()` from React Router DOM
- **After:** `'use next/router'` and file structure defines routes

---

### 2. **Server vs Client Components**

#### **Server Components (Default)**
- **Used for:** Data fetching, API calls, sensitive operations
- **Files:** `app/layout.jsx`, `app/movie/[id]/page.jsx`
- **Benefits:** No JavaScript sent to browser, secure API calls

```jsx
// Server Component - Fetches data server-side
export async function generateMetadata({ params }) {
  const movie = await getMovieDetails(params.id)
  return { title: movie.Title }
}

export default async function Page() {
  const movie = await getMovieDetails(id)
  return <MovieDetailClient initialMovie={movie} />
}
```

#### **Client Components** (marked with `'use client'`)
- **Used for:** Interactive features, state management, event handlers
- **Files:** Components with hooks, event listeners, localStorage
- **Examples:** Search, favorites toggle, modal, pagination

```jsx
'use client'

import { useState, useEffect } from 'react'

export default function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')
  return <input onChange={(e) => onSearch(e.target.value)} />
}
```

---

### 3. **API Calls**

**Before (Vite):**
```jsx
useEffect(() => {
  fetch(buildUrl(...)).then(res => res.json())
}, [query])
```

**After (Next.js - Server Component):**
```jsx
export async function getMovieDetails(imdbID) {
  const response = await fetch(buildUrl(...), {
    next: { revalidate: 86400 } // ISR: revalidate every 24 hours
  })
  return response.json()
}
```

---

### 4. **Environment Variables**

| Vite | Next.js 15 |
|------|-----------|
| `VITE_` prefix | `NEXT_PUBLIC_` prefix (public vars) |
| `import.meta.env` | `process.env` |

**Updated:**
```env
# Old
VITE_OMDB_API_KEY=xxx

# New
NEXT_PUBLIC_OMDB_API_KEY=xxx
```

---

### 5. **Styling**

✅ **Tailwind CSS:** Remains unchanged
- Same configuration
- Same utility classes
- Same global styles

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ (Next.js 15 requirement)
- npm or yarn

### Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your OMDB API key
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

3. **Get your API key:**
   - Visit [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - Register and get your free API key

4. **Run development server:**
```bash
npm run dev
```

5. **Open in browser:**
```
http://localhost:3000
```

---

## 📦 Component Architecture

### **Server Components (No Interactivity)**

| Component | Type | Purpose |
|-----------|------|---------|
| `app/layout.jsx` | Server | Root layout, metadata, SEO |
| `app/movie/[id]/page.jsx` | Server | Dynamic movie page, metadata generation |
| `app/not-found.jsx` | Server | 404 error page |

### **Client Components (Interactive)**

| Component | Type | Purpose |
|-----------|------|---------|
| `app/page.jsx` | Client | Home page, state management |
| `components/Navbar.jsx` | Client | Search input with debounce |
| `components/MovieCard.jsx` | Client | Favorite toggle, modal trigger |
| `components/MovieModal.jsx` | Client | Movie details modal display |
| `components/MovieGallery.jsx` | Client | Infinite scroll pagination |
| `components/MovieDetailClient.jsx` | Client | Movie detail page interactivity |

### **Utilities**

| Module | Type | Purpose |
|--------|------|---------|
| `lib/omdb.js` | Server | OMDB API functions with ISR caching |

---

## 🔑 Key Features Preserved

✅ **Search Movies** - Debounced search with 500ms delay
✅ **Infinite Scroll** - Automatic pagination on scroll
✅ **Favorites** - localStorage-based favorites management
✅ **Movie Details** - Full modal with ratings, plot, genre
✅ **Featured Section** - Hero banner with top movie
✅ **Dark Theme** - Tailwind dark styling
✅ **Responsive Design** - Mobile-first approach
✅ **SEO Optimization** - Dynamic metadata generation

---

## 🆕 New Features in Next.js

### **1. Dynamic Routing**
Direct access to movie details:
```
/movie/tt1234567
```

### **2. SEO Metadata**
Automatic `generateMetadata()` for each page:
```jsx
export async function generateMetadata({ params }) {
  const movie = await getMovieDetails(params.id)
  return {
    title: `${movie.Title} | Movie Explorer`,
    description: movie.Plot,
    openGraph: {
      image: movie.Poster,
    }
  }
}
```

### **3. Incremental Static Regeneration (ISR)**
Cache API responses and revalidate periodically:
```jsx
// Revalidate every hour
fetch(url, { next: { revalidate: 3600 } })
```

### **4. Built-in Image Optimization**
Next.js Image component (optional future enhancement):
```jsx
import Image from 'next/image'
```

---

## 🏗️ Build & Deployment

### **Local Build**
```bash
npm run build
npm start
```

### **Vercel Deployment**

1. **Push to GitHub:**
```bash
git push origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_OMDB_API_KEY`
   - Click Deploy

**Vercel Advantages:**
- Auto-deployment on push
- Edge caching for fast responses
- Automatic HTTPS
- Built-in analytics

---

## 📝 Package.json Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 🔒 Security & Best Practices

### **API Keys**
- ✅ `NEXT_PUBLIC_` prefix used only for public keys
- ✅ API calls made from server-side code when sensitive
- ✅ `.env` not committed to git

### **Performance**
- ✅ Server components reduce client-side JavaScript
- ✅ ISR caches API responses
- ✅ Lazy loading for images
- ✅ Code splitting automatic

### **SEO**
- ✅ Server-rendered metadata
- ✅ Dynamic Open Graph tags
- ✅ Semantic HTML structure
- ✅ Fast page loads

---

## 🐛 Troubleshooting

### **API Key Not Working**
```
Error: buildUrl returns empty apikey
```
**Solution:** Ensure `NEXT_PUBLIC_OMDB_API_KEY` is in `.env.local` and restart dev server

### **Localhost vs Production URL Differences**
**Next.js 15 requires explicit image domains in `next.config.js`**

Already configured for:
- `via.placeholder.com`
- `*.omdbapi.com`

### **Favorites Not Persisting**
**Check browser localStorage:**
```javascript
// In browser console
localStorage.getItem('favorites')
```

### **Build Fails**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try build again
npm run build
```

---

## 📚 Next.js 15 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

---

## 🎨 Styling Notes

### **Tailwind CSS Configuration**
- Located in `tailwind.config.js`
- Custom extensions:
  - `boxShadow.glow`: Cyan glow effect
  - `backdropBlur.xs`: Subtle blur

### **Global Styles**
- `app/globals.css`
- Dark theme background gradient
- Smooth scrolling behavior

### **CSS-in-JS**
- Not needed; pure Tailwind classes used
- Better performance than CSS-in-JS

---

## 📞 Support & Questions

For issues or questions:
1. Check the troubleshooting section
2. Review Next.js documentation
3. Check OMDB API documentation
4. Verify environment variables are set

---

## ✨ Migration Checklist

- ✅ Convert from Vite to Next.js 15
- ✅ Set up App Router
- ✅ Implement Server Components
- ✅ Implement Client Components
- ✅ Create dynamic routes `[id]`
- ✅ Add SEO metadata generation
- ✅ Update environment variables
- ✅ Preserve Tailwind CSS styling
- ✅ Test all features
- ✅ Prepare for Vercel deployment

---

## 📄 License

MIT License - See LICENSE file for details

---

**Migration Date:** 2026
**Next.js Version:** 15.x
**React Version:** 19.x
**Status:** ✅ Complete
