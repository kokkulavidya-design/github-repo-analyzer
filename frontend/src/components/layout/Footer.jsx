import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { ROUTES, SOCIAL_LINKS } from '@constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Features', path: '/#features' },
      { name: 'Dashboard', path: ROUTES.DASHBOARD },
      { name: 'Extension', path: ROUTES.EXTENSION },
      { name: 'Pricing', path: '/#pricing' },
    ],
    resources: [
      { name: 'Documentation', path: '/docs' },
      { name: 'API Reference', path: '/api-docs' },
      { name: 'Blog', path: '/blog' },
      { name: 'Support', path: '/support' },
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Privacy', path: '/privacy' },
      { name: 'Terms', path: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: Github, href: SOCIAL_LINKS.GITHUB, label: 'GitHub' },
    { icon: Twitter, href: SOCIAL_LINKS.TWITTER, label: 'Twitter' },
    { icon: Linkedin, href: SOCIAL_LINKS.LINKEDIN, label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@repoanalyzer.com', label: 'Email' },
  ]

  return (
    <footer className="glass-card border-t border-white/10 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              GitHub Repo Analyzer
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Powerful AI-driven insights for GitHub repositories. Analyze, understand,
              and optimize your projects with advanced metrics and visualizations.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} GitHub Repo Analyzer. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
