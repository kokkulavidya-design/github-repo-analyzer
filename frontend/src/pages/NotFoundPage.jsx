import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import { pageTransition } from '@constants/animations'
import { ROUTES } from '@constants'

const NotFoundPage = () => {
  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="container-custom text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold gradient-text">404</h1>
        </motion.div>
        
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex items-center justify-center space-x-4">
          <Link to={ROUTES.HOME} className="btn-gradient flex items-center space-x-2">
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <Link
            to={ROUTES.ANALYZE}
            className="px-6 py-3 rounded-lg font-semibold text-white border border-primary-500 hover:bg-primary-500/10 transition-all duration-300 flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Analyze Repo</span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default NotFoundPage
