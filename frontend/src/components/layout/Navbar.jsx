import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Github, BarChart3 } from 'lucide-react'
import { ROUTES } from '@constants'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'Dashboard', path: ROUTES.DASHBOARD },
    { name: 'Analyze', path: ROUTES.ANALYZE },
    { name: 'History', path: ROUTES.HISTORY },
    { name: 'Extension', path: ROUTES.EXTENSION },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2 group">
            <div className="relative">
              <BarChart3 className="w-8 h-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
              <div className="absolute inset-0 blur-lg bg-primary-500 opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="text-xl md:text-2xl font-bold gradient-text">
              RepoAnalyzer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(link.path)
                    ? 'text-primary-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to={ROUTES.ANALYZE} className="btn-gradient">
              Start Analyzing
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10 backdrop-blur-glass bg-dark-900/95"
        >
          <div className="container-custom py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={ROUTES.ANALYZE}
              onClick={() => setIsOpen(false)}
              className="block btn-gradient text-center"
            >
              Start Analyzing
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
