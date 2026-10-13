import { useState, useCallback, useEffect } from 'react'
import repositoryService from '@services/repositoryService'
import { STATUS, PAGINATION } from '@constants'

/**
 * Custom hook for repository history
 * Manages history state and pagination
 */
export const useHistory = (initialPageSize = PAGINATION.DEFAULT_PAGE_SIZE) => {
  const [status, setStatus] = useState(STATUS.IDLE)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  // Fetch history
  const fetchHistory = useCallback(async (currentPage = page, currentPageSize = pageSize) => {
    setStatus(STATUS.LOADING)
    setError(null)
    
    try {
      const result = await repositoryService.getHistory({
        page: currentPage,
        size: currentPageSize,
        sort: 'createdAt,desc'
      })
      
      setData(result.content || result)
      setTotalPages(result.totalPages || 0)
      setTotalElements(result.totalElements || 0)
      setStatus(STATUS.SUCCESS)
      
      return result
    } catch (err) {
      setError(err.message)
      setStatus(STATUS.ERROR)
      throw err
    }
  }, [page, pageSize])

  // Load more (for infinite scroll)
  const loadMore = useCallback(async () => {
    if (status === STATUS.LOADING || page >= totalPages - 1) return
    
    const nextPage = page + 1
    setPage(nextPage)
    
    try {
      const result = await repositoryService.getHistory({
        page: nextPage,
        size: pageSize,
        sort: 'createdAt,desc'
      })
      
      setData(prev => [...prev, ...(result.content || result)])
      setStatus(STATUS.SUCCESS)
    } catch (err) {
      setError(err.message)
      setStatus(STATUS.ERROR)
    }
  }, [page, pageSize, totalPages, status])

  // Go to specific page
  const goToPage = useCallback((newPage) => {
    setPage(newPage)
    fetchHistory(newPage, pageSize)
  }, [pageSize, fetchHistory])

  // Change page size
  const changePageSize = useCallback((newPageSize) => {
    setPageSize(newPageSize)
    setPage(0)
    fetchHistory(0, newPageSize)
  }, [fetchHistory])

  // Refresh history
  const refresh = useCallback(() => {
    setPage(0)
    fetchHistory(0, pageSize)
  }, [pageSize, fetchHistory])

  // Initial fetch
  useEffect(() => {
    fetchHistory()
  }, [])

  return {
    status,
    data,
    error,
    isLoading: status === STATUS.LOADING,
    isSuccess: status === STATUS.SUCCESS,
    isError: status === STATUS.ERROR,
    page,
    pageSize,
    totalPages,
    totalElements,
    hasMore: page < totalPages - 1,
    fetchHistory,
    loadMore,
    goToPage,
    changePageSize,
    refresh,
  }
}

export default useHistory
