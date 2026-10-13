/**
 * Validation utility functions
 */

/**
 * Validate GitHub repository URL
 * @param {string} url - Repository URL
 * @returns {Object} Validation result with owner and repo
 */
export const validateGitHubUrl = (url) => {
  if (!url) {
    return { isValid: false, error: 'URL is required' }
  }

  // Match github.com/owner/repo format
  const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/
  const match = url.match(githubRegex)

  if (!match) {
    return { isValid: false, error: 'Invalid GitHub URL format' }
  }

  const [, owner, repo] = match
  const cleanRepo = repo.replace(/\.git$/, '') // Remove .git suffix if present

  return {
    isValid: true,
    owner: owner.trim(),
    repo: cleanRepo.trim(),
  }
}

/**
 * Validate GitHub owner/repo format
 * @param {string} ownerRepo - Format: "owner/repo"
 * @returns {Object} Validation result
 */
export const validateOwnerRepo = (ownerRepo) => {
  if (!ownerRepo) {
    return { isValid: false, error: 'Repository is required' }
  }

  const parts = ownerRepo.split('/')
  if (parts.length !== 2) {
    return { isValid: false, error: 'Format must be: owner/repo' }
  }

  const [owner, repo] = parts
  if (!owner.trim() || !repo.trim()) {
    return { isValid: false, error: 'Owner and repository name are required' }
  }

  return {
    isValid: true,
    owner: owner.trim(),
    repo: repo.trim(),
  }
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid
 */
export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check if string is empty or whitespace
 * @param {string} str - String to check
 * @returns {boolean} Is empty
 */
export const isEmpty = (str) => {
  return !str || str.trim().length === 0
}

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (value === null || value === undefined || isEmpty(String(value))) {
    return { isValid: false, error: `${fieldName} is required` }
  }
  return { isValid: true }
}

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result
 */
export const validateMinLength = (value, minLength, fieldName = 'Field') => {
  if (!value || value.length < minLength) {
    return { 
      isValid: false, 
      error: `${fieldName} must be at least ${minLength} characters` 
    }
  }
  return { isValid: true }
}

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result
 */
export const validateMaxLength = (value, maxLength, fieldName = 'Field') => {
  if (value && value.length > maxLength) {
    return { 
      isValid: false, 
      error: `${fieldName} must be no more than ${maxLength} characters` 
    }
  }
  return { isValid: true }
}

export default {
  validateGitHubUrl,
  validateOwnerRepo,
  validateEmail,
  validateUrl,
  isEmpty,
  validateRequired,
  validateMinLength,
  validateMaxLength,
}
