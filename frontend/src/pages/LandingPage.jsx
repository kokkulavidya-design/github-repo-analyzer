import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Github, Zap, Shield, TrendingUp } from 'lucide-react'
import { pageTransition } from '@constants/animations'
import { ROUTES } from '@constants'
import HeroSection from '@components/ui/HeroSection'
import FeatureCard from '@components/cards/FeatureCard'
import RepoInputSection from '@components/ui/RepoInputSection'

const LandingPage = () => {
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

  return (
    <motion.div
      {...pageTransition}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Analysis Section */}
      <section className="section-padding">
        <div className="container-custom">
          <RepoInputSection />
        </div>
      </section>

      {/* Features Section */}
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
              Powerful Features for{' '}
              <span className="gradient-text">Better Insights</span>
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

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Analyze Your Repositories?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers using RepoAnalyzer to gain insights
              and improve their projects
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

export default LandingPage
