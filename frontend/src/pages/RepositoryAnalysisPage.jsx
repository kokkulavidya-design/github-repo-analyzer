import { motion } from 'framer-motion'
import { pageTransition } from '@constants/animations'
import RepoInputSection from '@components/ui/RepoInputSection'

const RepositoryAnalysisPage = () => {
  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Analyze Any Repository
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Enter a GitHub repository URL to get detailed insights and analytics
          </p>
        </div>
        
        <RepoInputSection />
      </div>
    </motion.div>
  )
}

export default RepositoryAnalysisPage
