# Environment Variables Reference Guide

## Overview
This document lists all files that require environment variables and the credentials/APIs needed for the College Insights application.

---

## 📋 Files Using Environment Variables

### 1. **ExamNews Component** 🗞️
**File:** `src/components/news/ExamNews.tsx`
**Line:** 26

**Environment Variable Required:**
```
NEXT_PUBLIC_GNEWS_KEY
```

**Purpose:** Fetches exam and education news from GNews API
- Searches for UPSC, SSC, Banking, NEET, CAT, NDA, CUET exam updates
- Displays news in a tabbed interface for different exam categories
- Shows news articles with thumbnails and descriptions

**API Details:**
- Service: GNews API
- Website: https://gnews.io/
- Free Tier: 100 requests/day
- Pricing: Free tier available, paid plans for higher limits
- Documentation: https://gnews.io/docs

**How to Get API Key:**
1. Go to https://gnews.io/
2. Sign up for a free account
3. Navigate to your API keys section
4. Copy your API key
5. Add it to `.env.local`: `NEXT_PUBLIC_GNEWS_KEY=your_key_here`

**API Endpoint Used:**
```
https://gnews.io/api/v4/search?q={query}&lang=en&country=in&max=15&apikey={apiKey}
```

**Parameters:**
- `q`: Search query (e.g., "UPSC OR SSC OR Banking OR Government exam India")
- `lang`: Language (en = English)
- `country`: Country code (in = India)
- `max`: Maximum articles (15 per request)
- `apikey`: Your GNews API key

---

## 🤖 Potential Third-Party Integrations (Not Yet Active)

### 2. **Groq API** (Dependency installed but not actively used)
**Package:** `groq@^4.20.3` (from package.json)

**Purpose:** AI-powered responses and chatbot functionality
- Could be used for intelligent college recommendations
- Could power the chatbot responses (chat-buddy.tsx)

**Service:** Groq API
- Website: https://console.groq.com/
- Free Tier: Yes, with rate limits
- Models Available: Mixtral, Llama2, etc.

**How to Get API Key:**
1. Go to https://console.groq.com/
2. Create an account or sign in
3. Go to API keys section
4. Create a new API key
5. Add to `.env.local`: `GROQ_API_KEY=your_key_here`

**If implementing, add to environment:**
```
GROQ_API_KEY=your_groq_api_key_here
```

---

### 3. **ChromaDB** (Dependency installed but not actively used)
**Package:** `chromadb@^3.1.6` (from package.json)

**Purpose:** Vector embeddings and semantic search
- Could be used for college similarity search
- Could store embeddings of college data for better search

**Service:** ChromaDB
- Website: https://www.trychroma.com/
- Can be self-hosted (local) or cloud-hosted
- Open source vector database

**Configuration Options:**

For Local Setup:
```
CHROMA_HOST=localhost
CHROMA_PORT=8000
```

For Cloud Setup:
```
CHROMA_API_KEY=your_api_key_here
CHROMA_HOST=your_cloud_host_here
```

---

## 📁 Files NOT Requiring Environment Variables

The following files use APIs but don't require external credentials:

1. **`src/app/api/institutions/search/route.ts`**
   - Internal API route for searching institutions
   - Uses local CSV data from `src/data/institutions.csv`
   - No external API keys needed

2. **`src/components/chatbot/chat-buddy.tsx`**
   - No external APIs currently configured
   - Uses local college data from `src/data/colleges-normalized.ts`
   - RAG-based search with local data

3. **`src/components/counselling/CounsellingWidget.tsx`**
   - Client-side widget for counselling requests
   - No external APIs configured
   - Could be connected to a backend form handler

---

## 🔧 Environment Setup Instructions

### Step 1: Create `.env.local` file
The `.env.local` file has been created in the project root.

### Step 2: Add Required API Keys

#### For GNews (Required for news feature):
1. Get API key from https://gnews.io/
2. Add to `.env.local`:
```
NEXT_PUBLIC_GNEWS_KEY=sk_test_xxxxxxxxxxxxxxxx
```

#### For Groq (Optional, for AI features):
1. Get API key from https://console.groq.com/
2. Add to `.env.local`:
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxx
```

#### For ChromaDB (Optional, for vector search):
1. Set up ChromaDB locally or use cloud service
2. Add configuration to `.env.local`:
```
CHROMA_HOST=localhost
CHROMA_PORT=8000
```

### Step 3: Load Environment Variables
Next.js automatically loads `.env.local` when you run:
```bash
npm run dev    # Development
npm run build  # Production build
npm start      # Production server
```

---

## 🔐 Security Notes

1. **.env.local is ignored by Git** - It won't be committed (see `.gitignore`)
2. **NEXT_PUBLIC_ prefix** - Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
   - Only put public, non-sensitive data here
3. **Server-side variables** - Variables without `NEXT_PUBLIC_` are server-only
4. **Never commit secrets** - Keep API keys private
5. **Rotate keys regularly** - If you suspect compromise

---

## 📊 API Rate Limits Summary

| Service | Free Tier Limit | Paid Plan | Notes |
|---------|-----------------|-----------|-------|
| GNews | 100 req/day | Higher with paid | Required for news feature |
| Groq | Rate limited | Generous free tier | Optional, for AI |
| ChromaDB | Unlimited (self-hosted) | Yes | Optional vectorDB |

---

## 🧪 Testing Environment Variables

To verify your environment variables are loaded correctly:

```javascript
// In your component or API route:
console.log(process.env.NEXT_PUBLIC_GNEWS_KEY); // Should show your key in browser

// Server-side only (API routes):
console.log(process.env.GROQ_API_KEY); // Won't be exposed to browser
```

---

## 📝 Environment Variable Template

Below is the complete template with all options:

```env
# ========================================
# REQUIRED - News Feature
# ========================================
NEXT_PUBLIC_GNEWS_KEY=your_gnews_api_key_here

# ========================================
# OPTIONAL - AI Integration
# ========================================
# GROQ_API_KEY=your_groq_api_key_here

# ========================================
# OPTIONAL - Vector Database
# ========================================
# CHROMA_HOST=localhost
# CHROMA_PORT=8000
# CHROMA_API_KEY=your_api_key_here (if using cloud)

# ========================================
# Node Configuration
# ========================================
NODE_ENV=development
```

---

## 🔍 Verification Checklist

- [ ] `.env.local` file created
- [ ] GNews API key obtained and added
- [ ] (Optional) Groq API key obtained and added
- [ ] (Optional) ChromaDB configured
- [ ] Run `npm run dev` successfully
- [ ] ExamNews component displays news articles
- [ ] No console errors about missing environment variables

---

## 👨‍💻 Quick Reference

**File:** `.env.local`
**Location:** Project root directory
**Modified:** Never commit this file
**Example:**
```
NEXT_PUBLIC_GNEWS_KEY=sk_test_abc123def456
GROQ_API_KEY=gsk_xyz789uvw123
```

---

**Last Updated:** April 2, 2026
**Project:** College Insights
