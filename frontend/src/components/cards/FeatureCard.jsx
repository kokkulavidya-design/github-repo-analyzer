import { motion } from 'framer-motion'
import { cardHover } from '@constants/animations'

const FeatureCard = ({ icon: Icon, title, description, color = 'primary' }) => {
  const colorStyles = {
    primary: 'text-primary-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  }

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="glass-card p-6 h-full"
    >
      <div className="flex flex-col h-full">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 flex items-center justify-center mb-4`}>
          <Icon className={`w-6 h-6 ${colorStyles[color]}`} />
        </div>
        
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 flex-1">{description}</p>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <button className="text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors inline-flex items-center space-x-1">
            <span>Learn more</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default FeatureCard
