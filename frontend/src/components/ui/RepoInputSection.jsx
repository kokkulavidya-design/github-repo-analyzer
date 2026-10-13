import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ExternalLink, AlertCircle } from 'lucide-react'
import { validateGitHubUrl, validateOwnerRepo } from '@utils/validators'
import { ROUTES } from '@constants'

const RepoInputSection = () => {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!input.trim()) {
      setError('Please enter a repository URL or owner/repo')
      return
    }

    // Try to validate as URL first
    let validation = validateGitHubUrl(input)
    
    // If not a valid URL, try owner/repo format
    if (!validation.isValid) {
      validation = validateOwnerRepo(input)
    }

    if (!validation.isValid) {
      setError(validation.error)
      return
    }

    setIsLoading(true)
    
    // Simulate API call (replace with actual API call)
    setTimeout(() => {
      navigate(`${ROUTES.DASHBOARD}?owner=${validation.owner}&repo=${validation.repo}`)
      setIsLoading(false)
    }, 1000)
  }

  const examples = [
    'facebook/react',
    'microsoft/vscode',
    'vercel/next.js',
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="repo-input" className="block text-sm font-medium mb-3">
              Repository URL or Owner/Repo
            </label>
            <div className="relative">
              <input
                id="repo-input"
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setError('')
                }}
                placeholder="e.g., https://github.com/owner/repo or owner/repo"
                className="input-glass w-full pl-12"
                disabled={isLoading}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-2 mt-3 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-gradient w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-5 h-5" />
                <span>Analyze Repository</span>
              </>
            )}
          </button>
        </form>

        {/* Examples */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-sm text-gray-400 mb-3">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                onClick={() => setInput(example)}
                className="text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/50 transition-all duration-300"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default RepoInputSection
