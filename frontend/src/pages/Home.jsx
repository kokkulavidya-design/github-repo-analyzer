import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, AlertCircle, Github, Zap, Shield, TrendingUp } from 'lucide-react'

import { pageTransition } from '@constants/animations'
import { ROUTES } from '@constants'
import HeroSection from '@components/ui/HeroSection'
import FeatureCard from '@components/cards/FeatureCard'
import repositoryService from '@services/repositoryService'
import { validateGitHubUrl } from '@utils/validators'

const STORAGE_KEY_ANALYSIS = 'gh-analyzer-last-analysis'
const STORAGE_KEY_URL = 'gh-analyzer-last-url'

const readStorage = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Silently ignore storage quota errors.
  }
}

const Home = () => {
  const persistedUrl = readStorage(STORAGE_KEY_URL) || ''
  const persistedAnalysis = readStorage(STORAGE_KEY_ANALYSIS)

  const [repoUrl, setRepoUrl] = useState(persistedUrl)
  const [inputValue, setInputValue] = useState(persistedUrl)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [analysis, setAnalysis] = useState(persistedAnalysis)

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Analysis',
      description: 'Get comprehensive insights in seconds with our optimized analysis engine.',
      color: 'primary',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared. Enterprise-grade security.',
      color: 'success',
    },
    {
      icon: TrendingUp,
      title: 'Advanced Metrics',
      description: 'Track trends, contributors, and code quality with actionable insights.',
      color: 'info',
    },
    {
      icon: Github,
      title: 'GitHub Integration',
      description: 'Seamlessly connects with GitHub API for real-time repository data.',
      color: 'warning',
    },
  ]

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setRepoUrl(inputValue)
    }, 250)

    return () => clearTimeout(debounceTimer)
  }, [inputValue])

  const isSubmitDisabled = loading || !repoUrl.trim()

  const handleAnalyze = async (event) => {
    event.preventDefault()

    const normalizedUrl = repoUrl.trim()

    if (!normalizedUrl) {
      setError('Please enter a repository URL.')
      return
    }

    const urlValidation = validateGitHubUrl(normalizedUrl)
    if (!urlValidation.isValid) {
      setError('Please enter a valid GitHub repository URL.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await repositoryService.analyzeRepositoryByUrl(normalizedUrl)
      setAnalysis(result)
      writeStorage(STORAGE_KEY_ANALYSIS, result)
      writeStorage(STORAGE_KEY_URL, normalizedUrl)
    } catch (apiError) {
      setAnalysis(null)
      setError(apiError.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div {...pageTransition} className="min-h-screen">
      <HeroSection />

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8"
            >
              <form onSubmit={handleAnalyze} className="space-y-6">
                <div>
                  <label htmlFor="repo-url" className="block text-sm font-medium mb-3">
                    Repository URL
                  </label>
                  <input
                    id="repo-url"
                    type="text"
                    value={inputValue}
                    onChange={(event) => {
                      setInputValue(event.target.value)
                      setError(null)
                    }}
                    placeholder="https://github.com/facebook/react"
                    className="input-glass w-full"
                    inputMode="url"
                    spellCheck={false}
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-400 mt-2">Press Enter to submit quickly.</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-2 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="btn-gradient w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5" />
                      <span>Start Analyzing</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {loading && !analysis && (
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <div className="h-8 w-2/3 bg-white/10 rounded mb-5 shimmer" />
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-white/10 rounded shimmer" />
                    <div className="h-4 w-5/6 bg-white/10 rounded shimmer" />
                    <div className="h-4 w-4/5 bg-white/10 rounded shimmer" />
                    <div className="h-4 w-3/4 bg-white/10 rounded shimmer" />
                    <div className="h-4 w-2/3 bg-white/10 rounded shimmer" />
                  </div>
                </div>

                <div className="glass-card p-6">
                  <div className="h-8 w-1/2 bg-white/10 rounded mb-5 shimmer" />
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-white/10 rounded shimmer" />
                    <div className="h-4 w-3/4 bg-white/10 rounded shimmer" />
                  </div>
                </div>
              </div>
            )}

            {analysis && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div className="glass-card p-6">
                  <h3 className="text-2xl font-bold mb-4">Repository Overview</h3>
                  <div className="space-y-3 text-sm md:text-base">
                    <p><span className="text-gray-400">Name:</span> {analysis.repoName || '-'}</p>
                    <p><span className="text-gray-400">Owner:</span> {analysis.owner || '-'}</p>
                    <p><span className="text-gray-400">Description:</span> {analysis.description || '-'}</p>
                    <p><span className="text-gray-400">Stars:</span> {analysis.stars ?? 0}</p>
                    <p><span className="text-gray-400">Forks:</span> {analysis.forks ?? 0}</p>
                    <p><span className="text-gray-400">Language:</span> {analysis.language || '-'}</p>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-2xl font-bold mb-4">Insights</h3>
                  <div className="space-y-3 text-sm md:text-base">
                    <p><span className="text-gray-400">Conclusion:</span> {analysis.conclusion || '-'}</p>
                    <p>
                      <span className="text-gray-400">Analyzed Date:</span>{' '}
                      {analysis.analyzedAt ? new Date(analysis.analyzedAt).toLocaleString() : '-'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section id="features" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for <span className="gradient-text">Better Insights</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to analyze and understand GitHub repositories
            </p>
          </motion.div>

          <div className="grid-responsive">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Analyze Your Repositories?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers using RepoAnalyzer to gain insights and improve their projects
            </p>
            <Link to={ROUTES.ANALYZE} className="btn-gradient inline-flex items-center space-x-2">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home
