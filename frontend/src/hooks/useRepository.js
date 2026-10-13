import { useState, useCallback } from 'react'
import repositoryService from '@services/repositoryService'
import { STATUS } from '@constants'

/**
 * Custom hook for repository operations
 * Manages state and API calls for repository analysis
 */
export const useRepository = () => {
  const [status, setStatus] = useState(STATUS.IDLE)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // Analyze repository
  const analyzeRepository = useCallback(async (owner, repo) => {
    setStatus(STATUS.LOADING)
    setError(null)
    
    try {
      const result = await repositoryService.analyzeRepository(owner, repo)
      setData(result)
      setStatus(STATUS.SUCCESS)
      return result
    } catch (err) {
      setError(err.message)
      setStatus(STATUS.ERROR)
      throw err
    }
  }, [])

  // Get repository by ID
  const getRepository = useCallback(async (id) => {
    setStatus(STATUS.LOADING)
    setError(null)
    
    try {
      const result = await repositoryService.getRepository(id)
      setData(result)
      setStatus(STATUS.SUCCESS)
      return result
    } catch (err) {
      setError(err.message)
      setStatus(STATUS.ERROR)
      throw err
    }
  }, [])

  // Reset state
  const reset = useCallback(() => {
    setStatus(STATUS.IDLE)
    setData(null)
    setError(null)
  }, [])

  return {
    status,
    data,
    error,
    isLoading: status === STATUS.LOADING,
    isSuccess: status === STATUS.SUCCESS,
    isError: status === STATUS.ERROR,
    analyzeRepository,
    getRepository,
    reset,
  }
}

export default useRepository
