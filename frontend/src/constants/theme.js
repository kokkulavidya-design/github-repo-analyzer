// Theme Configuration
export const theme = {
  colors: {
    primary: {
      main: '#0066ff',
      light: '#3385ff',
      dark: '#0052cc',
      gradient: 'linear-gradient(135deg, #0052cc 0%, #0066ff 100%)',
    },
    dark: {
      main: '#0a0d0f',
      light: '#191d21',
      lighter: '#323a42',
      border: 'rgba(255, 255, 255, 0.1)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b1bcc9',
      muted: '#7d90a5',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  breakpoints: {
    mobile: '320px',
    tablet: '640px',
    desktop: '1024px',
    wide: '1280px',
    ultraWide: '1536px',
  },

  spacing: {
    section: {
      mobile: '3rem',
      tablet: '4rem',
      desktop: '5rem',
    },
    container: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '2rem',
    },
  },

  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  shadows: {
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    glow: '0 0 20px rgba(0, 102, 255, 0.5)',
    glowLarge: '0 0 40px rgba(0, 102, 255, 0.6)',
  },

  borderRadius: {
    small: '0.5rem',
    medium: '0.75rem',
    large: '1rem',
    xl: '1.5rem',
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
}

export default theme
