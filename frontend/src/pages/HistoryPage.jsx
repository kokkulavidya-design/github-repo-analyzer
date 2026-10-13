import { motion } from 'framer-motion'
import { pageTransition } from '@constants/animations'
import { History, Search } from 'lucide-react'

const HistoryPage = () => {
  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <History className="w-8 h-8 text-primary-500" />
            <h1 className="text-4xl font-bold">Analysis History</h1>
          </div>
          <button className="btn-gradient flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
        
        <div className="glass-card p-8">
          <p className="text-gray-400">History content coming soon...</p>
        </div>
      </div>
    </motion.div>
  )
}

export default HistoryPage
