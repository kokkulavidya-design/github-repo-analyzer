# Quick Start Guide - GitHub Repo Analyzer Frontend

## 🚀 Setup Instructions

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React 18.3.1
- Vite 5.1.0
- Tailwind CSS 3.4.1
- Framer Motion 11.0.5
- React Router DOM 6.22.0
- Axios 1.6.7
- Lucide React (icons)

### Step 3: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` if needed (default connects to `http://localhost:8080`)

### Step 4: Start Development Server
```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## 🎯 What's Included

### ✅ Complete Folder Structure
```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── layout/      # Navbar, Footer, MainLayout
│   │   ├── ui/          # HeroSection, RepoInputSection
│   │   └── cards/       # FeatureCard
│   ├── pages/           # All 6 pages (Landing, Dashboard, etc.)
│   ├── features/        # Feature-specific components
│   ├── services/        # API integration layer
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utilities (formatters, validators)
│   ├── styles/          # Global CSS with Tailwind
│   └── constants/       # Theme, animations, config
```

### ✅ Pre-configured
- **Vite** - Fast build tool with HMR
- **Tailwind CSS** - Utility-first CSS with custom theme
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Path Aliases** - Clean imports with `@` prefix

### ✅ Design System
- **Glassmorphism** cards and effects
- **Dark + Blue gradient** theme
- **Responsive** breakpoints (mobile-first)
- **Custom animations** with Framer Motion
- **Icon library** (Lucide React)

### ✅ Pages Ready
1. **Landing Page** - Hero, features, CTA
2. **Dashboard** - Analytics overview
3. **Repository Analysis** - Detailed analysis
4. **History** - Past analyses
5. **Extension** - Browser extension promo
6. **404 Page** - Error page

---

## 📝 Quick Commands

```bash
# Development
npm run dev          # Start dev server (port 3000)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## 🎨 Using the Design System

### Glass Card
```jsx
<div className="glass-card p-6">
  Content here
</div>
```

### Gradient Button
```jsx
<button className="btn-gradient">
  Click Me
</button>
```

### Gradient Text
```jsx
<h1 className="gradient-text">
  Beautiful Text
</h1>
```

### Animations
```jsx
import { fadeIn, slideUp } from '@constants/animations'

<motion.div variants={fadeIn}>
  Animated content
</motion.div>
```

---

## 🔌 Backend Integration

The frontend is configured to connect to your Spring Boot backend:

### Default API URL
```
http://localhost:8080
```

### Proxy Configuration
All `/api/*` requests are automatically proxied to the backend in development.

### Using API Services
```jsx
import repositoryService from '@services/repositoryService'

const analyzeRepo = async () => {
  try {
    const result = await repositoryService.analyzeRepository('owner', 'repo')
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile (default) */
< 640px

/* Tablet */
md: 640px - 1024px

/* Desktop */
lg: > 1024px

/* Wide */
xl: > 1280px
```

---

## 🎯 Next Steps

### 1. Start the Backend
Make sure your Spring Boot backend is running on port 8080:
```bash
cd ..
mvn spring-boot:run
```

### 2. Customize Theme
Edit `src/constants/theme.js` to match your brand colors.

### 3. Add Components
Create new components in the appropriate folders:
- Layout components → `src/components/layout/`
- UI components → `src/components/ui/`
- Feature components → `src/features/[feature-name]/`

### 4. Add Pages
Add new pages in `src/pages/` and register routes in `src/App.jsx`

### 5. Connect to Real API
The repository service is ready to use - just implement your backend endpoints!

---

## 🎨 Customization Examples

### Change Primary Color
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    500: '#YOUR_COLOR',
    ...
  }
}
```

### Add New Animation
Edit `src/constants/animations.js`:
```js
export const myAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}
```

### Add New API Endpoint
Edit `src/services/repositoryService.js`:
```js
myNewEndpoint: async (params) => {
  return await api.get('/api/my-endpoint', { params })
}
```

---

## 📚 Documentation

- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion
- **React Router:** https://reactrouter.com

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Change port in vite.config.js
server: {
  port: 3001  // or any available port
}
```

### Backend Connection Issues
1. Make sure backend is running on port 8080
2. Check CORS configuration in Spring Boot
3. Verify proxy settings in `vite.config.js`

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🎉 You're Ready to Build!

The frontend structure is complete and production-ready. Start the dev server and begin customizing!

```bash
npm run dev
```

Visit: **http://localhost:3000**

Happy coding! 🚀
