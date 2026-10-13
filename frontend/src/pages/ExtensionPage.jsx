import { motion } from 'framer-motion'
import { Chrome, Globe } from 'lucide-react'
import { pageTransition } from '@constants/animations'
import { EXTENSION_LINKS } from '@constants'

const ExtensionPage = () => {
  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browser Extension
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Analyze repositories directly from GitHub with our powerful browser extension
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.a
            href={EXTENSION_LINKS.CHROME}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card p-8 text-center group cursor-pointer"
          >
            <Chrome className="w-16 h-16 mx-auto mb-4 text-primary-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">Chrome Extension</h3>
            <p className="text-gray-400">Install for Chrome & Edge</p>
          </motion.a>
          
          <motion.a
            href={EXTENSION_LINKS.FIREFOX}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card p-8 text-center group cursor-pointer"
          >
            <Globe className="w-16 h-16 mx-auto mb-4 text-primary-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">Firefox Extension</h3>
            <p className="text-gray-400">Install for Firefox</p>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export default ExtensionPage
