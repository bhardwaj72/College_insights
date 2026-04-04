# ⚡ Quick Start Guide

Get College Insights running in 5 minutes.

---

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))
- GNews API Key (free) - [Get one](https://gnews.io/)

---

## 🚀 Quick Start (5 minutes)

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/college-insights.git
cd college-insights
```

### 2. Install Dependencies

```bash
npm install
```

or with yarn:
```bash
yarn install
```

### 3. Get API Keys

**GNews API** (5 min):
1. Visit [https://gnews.io/](https://gnews.io/)
2. Click "Get API Key"
3. Sign up and copy your key

### 4. Create Environment File

```bash
# Copy template
cp .env.example .env.local

# Edit and add your GNews API key
nano .env.local
```

Add the following:
```env
NEXT_PUBLIC_GNEWS_KEY=your_gnews_key_here
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

---

## 📚 Explore the Application

### Home Page
- **URL**: http://localhost:3000
- **Features**: Trending colleges, exam news, hero banner

### Search Colleges
- **URL**: http://localhost:3000/explore
- **Features**: Search by name, state, city
- **Try**: Search "IIT" or "NIT"

### Compare Colleges
- **URL**: http://localhost:3000/compare
- **Features**: Compare multiple colleges side-by-side

### Submit Review
- **URL**: http://localhost:3000/submit-review
- **Features**: Submit college ratings and reviews

### Contact
- **URL**: http://localhost:3000/contact
- **Features**: Counselling request form

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build           # Create production build
npm start               # Run production build
npm run lint            # Check code quality

# Quick fixes
npm run lint -- --fix   # Auto-fix lint issues

# Database
cd src/data
# Edit colleges.json or submit reviews to reviews.json
```

---

## 🆘 Troubleshooting

### Port 3000 Already in Use?

```bash
npm run dev -- -p 3001
```

### API Key Not Working?

1. Check `.env.local` file exists
2. Verify key is copied correctly
3. Restart dev server (Ctrl+C, then `npm run dev`)
4. Check GNews website for API updates

### Dependencies Not Installing?

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails?

```bash
npm run lint
npx tsc --noEmit
npm run build
```

---

## 📖 Next Steps

1. **Read the Full README.md** for comprehensive documentation
2. **Review ARCHITECTURE.md** for system design
3. **Check API_REFERENCE.md** for API endpoints
4. **Explore COMPONENTS.md** for component library
5. **See DEPLOYMENT.md** for production deployment

---

## 🎯 What to Try First

### 1. Search for Colleges

```
1. Go to http://localhost:3000/explore
2. Type "IIT" in search box
3. View search results
```

### 2. View Exam News

```
1. Go to home page
2. Scroll to "Exam News" section
3. Click different tabs (UPSC, SSC, etc.)
```

### 3. Submit a Review

```
1. Go to http://localhost:3000/submit-review
2. Fill in college details
3. Add ratings and feedback
4. Submit form
```

---

## 📦 Project Structure

Key files and directories:

```
src/
├── app/
│   ├── page.tsx           ← Home page
│   ├── explore/           ← Search page
│   ├── compare/           ← Comparison page
│   ├── api/               ← Backend endpoints
│   └── ...
├── components/            ← Reusable UI components
├── data/                  ← College data (CSV, JSON)
└── lib/                   ← Utilities and helpers
```

---

## 🚀 Deployment

Ready to deploy? See [DEPLOYMENT.md](DEPLOYMENT.md) for:

- **Vercel** (recommended)
- **Netlify**
- **Docker**
- **Self-hosted**

---

## 💡 Tips

- Use "Ctrl+K" shortcut to search in browser dev tools
- Check Network tab to see API calls
- Use TypeScript for type safety
- Tailwind CSS for styling

---

## 🤝 Need Help?

Check these resources:

- [README.md](README.md) - Full documentation
- [API_REFERENCE.md](API_REFERENCE.md) - API endpoints
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [COMPONENTS.md](COMPONENTS.md) - Component docs
- [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md) - Environment setup

---

## ✅ Done!

You should now have College Insights running locally! 🎊

**Next**: Read [README.md](README.md) for the complete guide.

---

**Version**: 1.0  
**Created**: April 2026
