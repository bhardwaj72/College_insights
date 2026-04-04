# 🏗️ Architecture & Design Documentation

## College Insights - System Architecture

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Project Layout](#project-layout)
5. [Data Flow](#data-flow)
6. [API Architecture](#api-architecture)
7. [Component Hierarchy](#component-hierarchy)
8. [State Management](#state-management)
9. [Styling Architecture](#styling-architecture)
10. [Performance Considerations](#performance-considerations)
11. [Security](#security)
12. [Scalability](#scalability)

---

## 🎯 System Overview

**College Insights** is a full-stack web application built with modern web technologies. The system is designed to provide:

- **Frontend**: Server-side rendered React application with client-side interactivity
- **Backend**: Serverless API routes for data handling and external API integration
- **Data Layer**: CSV-based data storage with in-memory caching
- **External Services**: Integration with GNews API, Groq API, and Google Sheets

### Architecture Type: **Jamstack with API Routes**

```
Client (Browser)
    ↓
Next.js Application (SSR/SSG)
    ├→ Static Pages (Home, About, etc.)
    ├→ Dynamic Pages (College Detail, Compare)
    └→ API Routes (Serverless Functions)
         ├→ Institutions Search
         ├→ News Fetching
         └→ Counselling Submission
              ↓
         External APIs (GNews, Groq)
         CSV Database (Institutions)
         Google Sheets Webhook
```

---

## 🏛️ Architecture Diagram

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Browser)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js Application (React 19)                       │   │
│  │  ├─ Pages (App Router)                               │   │
│  │  ├─ Components (UI + Feature)                        │   │
│  │  ├─ State (React Hooks + Context)                    │   │
│  │  └─ Styling (Tailwind CSS)                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ (HTTP Requests)
┌─────────────────────────────────────────────────────────────┐
│                    SERVER LAYER (Node.js)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js API Routes (Serverless)                      │   │
│  │  ├─ /api/institutions/search                         │   │
│  │  ├─ /api/news                                        │   │
│  │  └─ /api/counselling                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Data Processing Layer                                │   │
│  │  ├─ CSV Parsing (institutions.csv)                   │   │
│  │  ├─ In-Memory Caching                                │   │
│  │  └─ Data Transformation                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
    ┌─────────┐          ┌─────────┐         ┌──────────┐
    │  GNews  │          │  Groq   │         │ Google   │
    │   API   │          │   API   │         │  Sheets  │
    └─────────┘          └─────────┘         └──────────┘
```

---

## 🛠️ Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.1 | React meta-framework with App Router |
| React | 19.2.3 | UI library for components |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| Radix UI | 2.x | Headless accessible components |
| Lucide React | 0.553.0 | SVG icon library |
| Recharts | 3.4.1 | React charting library |
| Embla Carousel | 8.6.0 | Carousel/slider component |

### Backend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js API Routes | 16.1.1 | Serverless API endpoints |
| Node.js | 18+ | JavaScript runtime |
| TypeScript | 5.x | Type-safe backend code |
| csv-parse | 6.1.0 | CSV file parsing |

### External Services

| Service | Purpose | Status |
|---------|---------|--------|
| GNews API | News aggregation | Active |
| Groq API | AI responses | Installed, optional |
| ChromaDB | Vector embeddings | Installed, optional |
| Google Sheets | Data collection | Optional |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| ESLint | 9.x | Code linting |
| PostCSS | 4.x | CSS preprocessing |
| Tailwindcss/PostCSS | 4.x | CSS framework |

---

## 📂 Project Layout

### Core Directory Structure

```
src/
├── app/                          # Next.js App Router directory
│   ├── layout.tsx               # Root layout wrapper
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global CSS
│   │
│   ├── api/                     # API routes (serverless functions)
│   │   ├── institutions/search/ # Search endpoint
│   │   ├── news/               # News fetching
│   │   └── counselling/        # Form submission
│   │
│   ├── college/[slug]/         # Dynamic college detail page
│   ├── compare/                # Comparison page
│   ├── explore/                # Exploration/search page
│   ├── insights/               # Analytics page
│   ├── submit-review/          # Review submission page
│   ├── contact/                # Contact form page
│   └── about/                  # About page
│
├── components/                  # Reusable components
│   ├── ui/                     # Shadcn-style UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── carousel.tsx
│   │   ├── college-card.tsx
│   │   ├── hero-banner.tsx
│   │   ├── reels-carousel.tsx
│   │   └── search-bar.tsx
│   │
│   ├── layout/                 # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   │
│   ├── chatbot/                # AI chatbot features
│   │   └── chat-buddy.tsx
│   │
│   ├── counselling/            # Counselling features
│   │   └── CounsellingWidget.tsx
│   │
│   └── news/                   # News features
│       └── ExamNews.tsx
│
├── data/                        # Static data and data sources
│   ├── colleges-normalized.ts  # Pre-processed college data
│   ├── colleges.json           # College dataset
│   ├── insights.json           # Analytics data
│   ├── reviews.json            # Review submissions
│   └── institutions.csv        # AICTE institutions database
│
├── lib/                        # Utility functions and helpers
│   ├── institutions.ts         # Institution search logic
│   └── utils.ts               # General utilities
│
└── types/                      # TypeScript type definitions
    └── institution.ts         # Institution interfaces
```

### Root Configuration Files

```
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.mjs        # PostCSS plugins
├── components.json           # Shadcn component config
├── eslint.config.mjs         # ESLint rules
├── .env.local               # Local environment variables
├── .env.example             # Environment template
└── ENV_SETUP_GUIDE.md       # Setup documentation
```

---

## 🔄 Data Flow

### Page Render Flow

```
User Request to Page
       ↓
Next.js Router
       ├→ Static Page (HTML generated at build time)
       │   └→ Hydrated with React (client-side)
       │
       └→ Dynamic Page
           ├→ Server-side rendering (SSR)
           │   ├→ Fetch data from API routes
           │   └→ Render to HTML
           │
           └→ Send HTML + JavaScript to browser
               └→ React hydration on client
```

### Data Fetching Flow

```
Component Renders
       ↓
useEffect / useMemo Hook Triggered
       ↓
Fetch from API Route
       ↓
API Route Processing
       ├→ Parse query parameters
       ├→ Load CSV data (with caching)
       ├→ Filter/search data
       └→ Return JSON response
           ↓
Component Updates State
       ↓
Component Re-renders
```

### External API Integration Flow

```
Component Request
       ↓
Next.js API Route
       ├→ Check for API key in environment
       ├→ Build external API request
       ├→ Fetch from external service
       │   ├→ Retry logic on failure
       │   └→ Rate limiting handling
       ├→ Transform response
       ├→ Cache if applicable
       └→ Return to client
```

---

## 🔌 API Architecture

### API Route Structure

```typescript
// Pattern: src/app/api/[feature]/[action]/route.ts

export async function GET(req: NextRequest) {
  try {
    // 1. Extract parameters
    const params = new URL(req.url).searchParams
    
    // 2. Validate input
    // 3. Fetch/process data
    // 4. Return response
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Parse request body
    const payload = await req.json()
    
    // 2. Validate payload
    // 3. Process data
    // 4. Store/send data
    // 5. Return response
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
```

### API Routes Overview

#### 1. **Institution Search** (`/api/institutions/search`)

```
GET /api/institutions/search?q=IIT&state=Delhi&page=1&pageSize=10

Flow:
1. Parse search parameters (q, state, city, region, group, sort)
2. Load institutions from CSV (cached)
3. Filter by search criteria
4. Pagination
5. Sort results
6. Return paginated results
```

#### 2. **News Fetching** (`/api/news`)

```
GET /api/news?q=UPSC&lang=en&country=in&max=15

Flow:
1. Extract search query and parameters
2. Validate query parameter exists
3. Check GNews API key
4. Build GNews API URL
5. Fetch from GNews
6. Handle response/errors
7. Transform and return results
```

#### 3. **Counselling Submission** (`/api/counselling`)

```
POST /api/counselling

Flow:
1. Parse JSON payload
2. Validate data
3. Check if Google Sheets URL is configured
4. Send to Google Sheets webhook (if configured)
5. Fallback: Save to local JSON file
6. Return success/error
```

---

## 🎨 Component Hierarchy

### Page Component Tree

```
RootLayout (layout.tsx)
├─ Header (header.tsx)
├─ Main Content
│  └─ Page-specific content
└─ Footer (footer.tsx)

Home Page (page.tsx)
├─ HeroBanner
├─ ReelsCarousel
├─ ExamNews
│  ├─ Tabs (for different exams)
│  └─ ArticleCards
├─ TrendingColleges
│  └─ CollegeCard (repeated)
└─ ChatBuddy

College Detail Page ([slug]/page.tsx)
├─ CollegeHeader
├─ CollegeInfo
├─ RatingCards (placement, faculty, etc.)
├─ ReviewSection
└─ RelatedColleges

Compare Page
├─ CollegeSelector (multi-select)
├─ ComparisonTable
└─ ComparisonCharts (Recharts)

Explore/Search Page
├─ SearchBar
├─ FilterPanel
│  ├─ StateSelector
│  ├─ CitySelector
│  └─ GroupSelector
└─ Results
   └─ CollegeCard (repeated)
```

### Component Data Flow

```
Parent Component (Page)
       ↓
State (useState, useContext)
       ↓
Render Child Components
       ├─ Presentational (UI)
       │  └─ Receives props only
       │
       └─ Container (Smart)
          ├─ Fetches data
          ├─ Manages state
          └─ Passes data to presentational children
```

---

## 💾 State Management

### Client-Side State

The application uses React's built-in hooks for state management:

```typescript
// Local Component State
const [colleges, setColleges] = useState<College[]>([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

// Effects for data fetching
useEffect(() => {
  fetchData()
}, [searchTerm])

// Computed values
const filteredColleges = useMemo(() => {
  return colleges.filter(c => ...)
}, [colleges, filter])
```

### Data Caching Patterns

#### 1. **Server-Side Caching** (Institutions)
```typescript
// src/lib/institutions.ts
let cache: { items: Institution[], mtimeMs: number } | null = null

async function loadFromDisk() {
  if (cache && isCacheValid()) {
    return cache  // Return cached data
  }
  // Load from CSV
  cache = await parseCSV()
  return cache
}
```

#### 2. **Client-Side Caching** (useMemo)
```typescript
const trendingColleges = useMemo(() => {
  return collegesData
    .sort((a, b) => getRating(b) - getRating(a))
    .slice(0, 50)
}, [collegesData])
```

---

## 🎨 Styling Architecture

### Tailwind CSS Configuration

The project uses Tailwind CSS v4 for styling:

```javascript
// Utility-first approach
<div className="p-4 bg-blue-500 text-white rounded-lg shadow-md">
  Content
</div>
```

### Component Styling Pattern

```typescript
// Shadcn-style component with variants
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Button({ variant = 'default', size = 'md', className, ...props }: ButtonProps) {
  const baseStyles = "font-medium transition-colors"
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 hover:bg-gray-50",
    ghost: "hover:bg-gray-100"
  }
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }
  
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  )
}
```

### Global Styles

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utilities and component classes */
@layer components {
  .card-base {
    @apply rounded-lg border border-gray-200 bg-white shadow-sm;
  }
}
```

---

## ⚡ Performance Considerations

### 1. **Image Optimization**

- Use Next.js Image component for automatic optimization
- Serve WebP format where supported
- Lazy load images below the fold

### 2. **Code Splitting**

- Next.js App Router automatically code-splits
- Dynamic imports for heavy components
- Route-based splitting with lazy loading

### 3. **Data Caching**

- CSV data cached in memory on server
- Browser caching headers for static assets
- SWR/React Query patterns for data fetching

### 4. **Bundle Size**

| Package | Size | Purpose |
|---------|------|---------|
| next | ~50kb | Framework |
| react | ~42kb | UI library |
| tailwindcss | ~15kb | Styling |
| recharts | ~80kb | Charts |

### 5. **Database Query Optimization**

```typescript
// CSV loading with caching
const cache = new Map()

function getInstitutionsCached() {
  if (cache.has('institutions')) {
    const cached = cache.get('institutions')
    if (Date.now() - cached.timestamp < 3600000) // 1 hour
      return cached.data
  }
  
  const data = parseCSV()
  cache.set('institutions', { data, timestamp: Date.now() })
  return data
}
```

---

## 🔐 Security Considerations

### 1. **API Key Protection**

```env
# Never expose these keys to frontend
GROQ_API_KEY=xxxx              # Backend only
COUNSELLING_SHEET_URL=xxxx     # Backend only

# Safe to expose (public)
NEXT_PUBLIC_GNEWS_KEY=xxxx
```

### 2. **Input Validation**

```typescript
// Validate search parameters
const q = searchParams.get('q')
if (!q || q.length > 100) {
  return error('Invalid query')
}

// Sanitize inputs
const sanitized = q.trim().replace(/[<>]/g, '')
```

### 3. **CORS & Request Validation**

```typescript
// Verify request origin
const origin = req.headers.get('origin')
if (origin && !ALLOWED_ORIGINS.includes(origin)) {
  return error('Unauthorized origin')
}
```

### 4. **Rate Limiting**

```typescript
// Basic rate limiting
const rateLimiter = new Map()

function checkRateLimit(ip: string) {
  const now = Date.now()
  const requests = rateLimiter.get(ip) || []
  const recentRequests = requests.filter(t => now - t < 60000)
  
  if (recentRequests.length > 10) {
    return false  // Rate limited
  }
  
  rateLimiter.set(ip, [...recentRequests, now])
  return true
}
```

---

## 📈 Scalability

### Current Limitations

- CSV-based institution data (in-memory)
- Single-node serverless deployment
- No database for scalable data storage

### Scaling Strategies

#### 1. **Add a Real Database**

```
Current: CSV → In-Memory Cache → API
Future:  PostgreSQL ← ORM (Prisma) → API
```

#### 2. **Add Vector Search (ChromaDB)**

```typescript
// For semantic search
const embeddings = await chroma.add('colleges', {
  ids: colleges.map(c => c.id),
  embeddings: collegeEmbeddings,
  metadatas: colleges
})

const results = await chroma.query({
  queryEmbeddings: [queryEmbedding],
  nResults: 10
})
```

#### 3. **Add Caching Layer (Redis)**

```typescript
// Cache frequent searches
const cached = await redis.get(`search:${query}`)
if (cached) return JSON.parse(cached)

const results = await searchInstitutions(query)
await redis.set(`search:${query}`, JSON.stringify(results), 'EX', 3600)
return results
```

#### 4. **Implement CDN**

- Cache static assets on CDN
- Reduce server load
- Faster global delivery
- Vercel CDN included automatically

#### 5. **Serverless Function Optimization**

- Cold start optimization
- Function splitting by feature
- Resource allocation tuning
- Monitoring and alerting

---

## 🔄 Deployment Architecture

### Development Environment

```
Local Machine
├─ npm run dev
├─ Next.js Dev Server (http://localhost:3000)
├─ Hot Module Replacement
└─ Source Maps
```

### Production Environment

```
Vercel Deployment
├─ Automatic builds on git push
├─ Edge Functions for API routes
├─ CDN for static assets
├─ Serverless backend
└─ Automatic HTTPS
```

### Continuous Integration/Deployment

```yaml
Trigger: Git push to main branch
  ↓
GitHub Actions (optional)
  ├─ Run tests
  ├─ Lint code
  ├─ Build verification
  └─ Deploy to Vercel
  
Vercel Build Process
  ├─ Install dependencies
  ├─ Type check
  ├─ Run build
  ├─ Optimize assets
  └─ Deploy to edge network
```

---

## 📊 Monitoring & Observability

### Key Metrics to Track

1. **Performance**
   - Page load time (FCP, LCP)
   - API response time
   - Function execution time

2. **Usage**
   - API endpoint hits
   - User sessions
   - Search queries

3. **Errors**
   - 4xx/5xx status codes
   - Failed API calls
   - Unhandled exceptions

### Logging Strategy

```typescript
// API route logging
console.log({
  endpoint: '/api/institutions/search',
  timestamp: new Date().toISOString(),
  query: searchParams,
  duration: endTime - startTime,
  resultCount: results.length
})
```

---

## 🎯 Future Improvements

1. **Database Migration**
   - Replace CSV with PostgreSQL
   - Add Prisma ORM

2. **Enhanced Search**
   - Add Elasticsearch
   - Vector embeddings with ChromaDB

3. **User Authentication**
   - Add NextAuth.js
   - User profiles and bookmarks

4. **Analytics**
   - Track user behavior
   - Integration with Google Analytics

5. **Real-time Features**
   - WebSocket for chat
   - Live notifications

6. **Mobile App**
   - React Native version
   - Expo deployment

---

**Document Version**: 1.0  
**Last Updated**: April 2026
