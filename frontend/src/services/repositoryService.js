import api from './api'
import { API_BASE_URL, API_ENDPOINTS } from '@constants'

const ANALYZE_TIMEOUT_MS = 15000
const ANALYZE_MAX_RETRIES = 2
const RETRY_BASE_DELAY_MS = 500
const ANALYZE_CACHE_TTL_MS = 5 * 60 * 1000

const analysisCache = new Map()
const inFlightAnalyzeRequests = new Map()

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Repository Service
 * Handles all API calls related to repository analysis
 */
const repositoryService = {
  /**
   * Analyze a GitHub repository
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   * @returns {Promise} Analysis data
   */
  analyzeRepository: async (owner, repo) => {
    try {
      const response = await api.post(API_ENDPOINTS.ANALYZE_REPOSITORY, {
        owner,
        repo,
      })
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Analyze a GitHub repository by URL
   * Uses fetch to match backend contract for /api/analyze endpoint
   * @param {string} repoUrl - Full GitHub repository URL
   * @returns {Promise<Object>} Analysis response data
   */
  analyzeRepositoryByUrl: async (repoUrl) => {
    const requestKey = repoUrl.trim()
    const cached = analysisCache.get(requestKey)

    if (cached && cached.expiresAt > Date.now()) {
      return cached.data
    }

    if (inFlightAnalyzeRequests.has(requestKey)) {
      return inFlightAnalyzeRequests.get(requestKey)
    }

    const requestPromise = (async () => {
    let lastError = null

    for (let attempt = 0; attempt <= ANALYZE_MAX_RETRIES; attempt += 1) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), ANALYZE_TIMEOUT_MS)

      try {
        const response = await fetch(`${API_BASE_URL}/api/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ repoUrl: requestKey }),
          signal: controller.signal,
        })

        let data = null
        try {
          data = await response.json()
        } catch {
          // Keep null when backend responds with non-JSON body.
        }

        if (!response.ok) {
          const responseError = {
            message: data?.message || 'Failed to analyze repository',
            status: response.status,
            data,
          }

          // Retry transient server failures only.
          if (response.status >= 500 && attempt < ANALYZE_MAX_RETRIES) {
            lastError = responseError
            await delay(RETRY_BASE_DELAY_MS * (attempt + 1))
            continue
          }

          throw responseError
        }

        analysisCache.set(requestKey, {
          data,
          expiresAt: Date.now() + ANALYZE_CACHE_TTL_MS,
        })

        return data
      } catch (error) {
        const isTimeout = error?.name === 'AbortError'
        const isNetwork = error instanceof TypeError
        const canRetry = (isTimeout || isNetwork) && attempt < ANALYZE_MAX_RETRIES

        if (canRetry) {
          lastError = {
            message: 'Network is slow. Retrying request...',
            status: 0,
            data: null,
          }
          await delay(RETRY_BASE_DELAY_MS * (attempt + 1))
          continue
        }

        if (isTimeout) {
          throw {
            message: 'Request timed out. Please try again.',
            status: 408,
            data: null,
          }
        }

        throw error?.message
          ? error
          : {
              message: lastError?.message || 'Failed to analyze repository',
              status: lastError?.status || 0,
              data: lastError?.data || null,
            }
      } finally {
        clearTimeout(timeoutId)
      }
    }

    throw {
      message: lastError?.message || 'Failed to analyze repository',
      status: lastError?.status || 0,
      data: lastError?.data || null,
    }
    })()

    inFlightAnalyzeRequests.set(requestKey, requestPromise)

    try {
      return await requestPromise
    } finally {
      inFlightAnalyzeRequests.delete(requestKey)
    }
  },

  /**
   * Get repository by ID
   * @param {string} id - Repository ID
   * @returns {Promise} Repository data
   */
  getRepository: async (id) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_REPOSITORY}/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Get analysis history
   * @param {Object} params - Query parameters (page, size, sort)
   * @returns {Promise} History data
   */
  getHistory: async (params = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_HISTORY, { params })
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Search repositories
   * @param {string} query - Search query
   * @param {Object} params - Additional parameters
   * @returns {Promise} Search results
   */
  searchRepositories: async (query, params = {}) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_REPOSITORY}/search`, {
        params: { query, ...params }
      })
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Delete repository from history
   * @param {string} id - Repository ID
   * @returns {Promise} Deletion confirmation
   */
  deleteRepository: async (id) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.GET_REPOSITORY}/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  /**
   * Check API health
   * @returns {Promise} Health status
   */
  healthCheck: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.HEALTH_CHECK)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default repositoryService
