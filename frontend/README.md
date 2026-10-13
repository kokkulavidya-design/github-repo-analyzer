# GitHub Repository Analyzer - Frontend

Modern React frontend application for GitHub Repository Analyzer with AI-powered insights and analytics.

## 🚀 Tech Stack

- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS with custom theme
- **Animations:** Framer Motion
- **Routing:** React Router DOM v6
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **State Management:** React Hooks

## 📁 Project Structure

```
frontend/
├── src/
│   ├── assets/              # Static assets (images, fonts)
│   ├── components/
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   ├── ui/              # Reusable UI components
│   │   ├── cards/           # Card components
│   │   └── animations/      # Animation components
│   ├── pages/               # Page components
│   ├── features/            # Feature-specific components
│   │   ├── repository/      # Repository analysis features
│   │   ├── dashboard/       # Dashboard features
│   │   └── history/         # History features
│   ├── services/            # API services
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── styles/              # Global styles
│   └── constants/           # Constants and configuration
├── public/                  # Public assets
└── package.json             # Dependencies
```

## 🎨 Design System

### Theme Colors
- **Primary:** Blue (#0066ff)
- **Dark:** Black/Dark Gray (#0a0d0f - #191d21)
- **Accent:** Gradient blues

### Key Features
- Glassmorphism design
- Dark + Blue gradient theme
- Smooth Framer Motion animations
- Mobile-first responsive design
- AI developer tool aesthetic

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8080
```

4. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🔌 API Integration

The frontend connects to the Spring Boot backend at `http://localhost:8080` by default.

### API Endpoints Used:
- `POST /api/repositories/analyze` - Analyze repository
- `GET /api/repositories/{id}` - Get repository details
- `GET /api/repositories/history` - Get analysis history

## 🎯 Key Components

### Layout Components
- **Navbar:** Responsive navigation with mobile menu
- **Footer:** Links and social media
- **MainLayout:** Main app layout wrapper

### UI Components
- **HeroSection:** Landing page hero
- **RepoInputSection:** Repository URL input
- **FeatureCard:** Feature showcase cards

### Pages
- **LandingPage:** Home page with hero and features
- **DashboardPage:** Main dashboard
- **RepositoryAnalysisPage:** Repository analysis interface
- **HistoryPage:** Analysis history
- **ExtensionPage:** Browser extension promo
- **NotFoundPage:** 404 error page

## 🎨 Styling

### Utility Classes
- `.glass-card` - Glassmorphism card effect
- `.btn-gradient` - Gradient button
- `.gradient-text` - Gradient text effect
- `.floating` - Floating animation
- `.input-glass` - Glass input field

### Custom Animations
All animations are defined in `src/constants/animations.js` using Framer Motion variants.

## 🔧 Configuration Files

- `vite.config.js` - Vite configuration with path aliases
- `tailwind.config.js` - Tailwind theme and customization
- `postcss.config.js` - PostCSS configuration

## 📦 Dependencies

### Core
- react, react-dom, react-router-dom
- framer-motion (animations)
- axios (HTTP client)
- lucide-react (icons)

### Dev Dependencies
- @vitejs/plugin-react
- tailwindcss, autoprefixer, postcss
- eslint

## 🚀 Development Tips

1. **Path Aliases:** Use `@` prefix for clean imports
   ```jsx
   import Component from '@components/Component'
   ```

2. **Animations:** Use Framer Motion variants from constants
   ```jsx
   import { fadeIn } from '@constants/animations'
   ```

3. **Theme:** Access theme values from constants
   ```jsx
   import theme from '@constants/theme'
   ```

4. **API Calls:** Use service layer instead of direct axios
   ```jsx
   import repositoryService from '@services/repositoryService'
   ```

## 📄 License

MIT License - See backend for details

## 👥 Contributing

1. Follow the established folder structure
2. Use Tailwind classes over custom CSS when possible
3. Implement responsive design (mobile first)
4. Add Framer Motion animations for interactions
5. Write reusable components
6. Document complex logic

## 🔗 Related

- Backend: Spring Boot API (parent directory)
- Extension: Browser extension (to be implemented)

---

Built with ❤️ using React + Vite + Tailwind CSS
