import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout Components
import MainLayout from '@components/layout/MainLayout'

// Pages
import Home from '@pages/Home'
import DashboardPage from '@pages/DashboardPage'
import RepositoryAnalysisPage from '@pages/RepositoryAnalysisPage'
import HistoryPage from '@pages/HistoryPage'
import ExtensionPage from '@pages/ExtensionPage'
import NotFoundPage from '@pages/NotFoundPage'

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="analyze" element={<RepositoryAnalysisPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="extension" element={<ExtensionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App
