import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, Code2, CalendarDays, User, AlertCircle, RefreshCw, Github, Inbox } from 'lucide-react'
import { pageTransition, staggerContainer, cardHover } from '@constants/animations'

// ─── helpers ────────────────────────────────────────────────────────────────

const fetchRepositories = async (signal) => {
  try {
    const response = await fetch('http://localhost:8080/api/repositories', { signal })
    console.log(response)

    if (!response.ok) {
      throw new Error('Failed to fetch repositories')
    }

    const text = await response.text()
    const data = text ? JSON.parse(text) : []
    console.log(data)

    return Array.isArray(data) ? data : []
  } catch (error) {
    throw new Error(error?.message || 'Failed to fetch repositories')
  }
}

const formatDate = (raw) => {
  if (!raw) return '—'
  try {
    return new Date(raw).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return raw
  }
}

// ─── sub-components ─────────────────────────────────────────────────────────

const Spinner = () => (
  <div className="flex flex-col items-center justify-center py-20 space-y-4">
    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-gray-400 text-sm">Fetching repositories…</p>
  </div>
)

const ErrorBanner = ({ message, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
  >
    <div className="flex items-start space-x-3 text-red-400">
      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
    <button
      onClick={onRetry}
      className="flex items-center space-x-2 text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/50 transition-all duration-300 flex-shrink-0"
    >
      <RefreshCw className="w-4 h-4" />
      <span>Retry</span>
    </button>
  </motion.div>
)

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="glass-card p-16 flex flex-col items-center justify-center text-center"
  >
    <Inbox className="w-14 h-14 text-gray-600 mb-5" />
    <h3 className="text-xl font-semibold mb-2">No repositories analyzed yet</h3>
    <p className="text-gray-400 text-sm max-w-xs">
      Head back to the home page, paste a GitHub URL and hit <span className="text-primary-400">Start Analyzing</span>.
    </p>
  </motion.div>
)

const RepoCard = ({ repo }) => (
  <motion.div
    variants={cardHover}
    initial="rest"
    whileHover="hover"
    className="glass-card p-6 flex flex-col h-full cursor-default"
  >
    {/* header */}
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center space-x-2 min-w-0">
        <Github className="w-5 h-5 text-primary-400 flex-shrink-0" />
        <h3 className="text-lg font-bold truncate">{repo.repoName || '—'}</h3>
      </div>
      {repo.language && (
        <span className="ml-2 flex-shrink-0 flex items-center space-x-1 text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30">
          <Code2 className="w-3 h-3" />
          <span>{repo.language}</span>
        </span>
      )}
    </div>

    {/* owner */}
    <div className="flex items-center space-x-1 text-sm text-gray-400 mb-3">
      <User className="w-3.5 h-3.5" />
      <span>{repo.owner || '—'}</span>
    </div>

    {/* description */}
    <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-1">
      {repo.description || 'No description provided.'}
    </p>

    {/* stats row */}
    <div className="flex items-center space-x-5 text-sm text-gray-300 mb-4">
      <span className="flex items-center space-x-1">
        <Star className="w-4 h-4 text-yellow-400" />
        <span>{repo.stars ?? 0}</span>
      </span>
      <span className="flex items-center space-x-1">
        <GitFork className="w-4 h-4 text-blue-400" />
        <span>{repo.forks ?? 0}</span>
      </span>
    </div>

    {/* conclusion */}
    {repo.conclusion && (
      <div className="text-xs text-gray-400 mb-4 border-t border-white/10 pt-3 line-clamp-2">
        <span className="text-primary-400 font-medium">Insight: </span>
        {repo.conclusion}
      </div>
    )}

    {/* footer */}
    <div className="flex items-center space-x-1 text-xs text-gray-500 pt-3 border-t border-white/10 mt-auto">
      <CalendarDays className="w-3.5 h-3.5" />
      <span>Analyzed {formatDate(repo.analyzedAt)}</span>
    </div>
  </motion.div>
)

// ─── page ────────────────────────────────────────────────────────────────────

const DashboardPage = () => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fetchCount, setFetchCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchRepositories(controller.signal)
      .then((data) => setRepos(data))
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          setError(err.message || 'Something went wrong.')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [fetchCount])

  const retry = () => setFetchCount((c) => c + 1)

  return (
    <motion.div {...pageTransition} className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        {/* page header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-1">
              Dashboard
            </h1>
            <p className="text-gray-400 text-sm">All analyzed repositories in one place</p>
          </div>
          {!loading && (
            <button
              onClick={retry}
              className="flex items-center space-x-2 text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/50 transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          )}
        </div>

        {/* states */}
        {loading && <Spinner />}

        {!loading && error && <ErrorBanner message={error} onRetry={retry} />}

        {!loading && !error && repos.length === 0 && <EmptyState />}

        {!loading && !error && repos.length > 0 && (
          <>
            <p className="text-sm text-gray-400 mb-6">
              {repos.length} {repos.length === 1 ? 'repository' : 'repositories'} found
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id ?? index}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: 'easeOut' },
                    },
                  }}
                >
                  <RepoCard repo={repo} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default DashboardPage
