import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const About = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements (greyscale) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <motion.div 
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Monochrome header */}
        <div className="bg-gray-900 p-8 text-center">
          <motion.h1 
            className="text-5xl font-bold text-white mb-2 font-serif"
            variants={itemVariants}
          >
            Echo
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 font-medium"
            variants={itemVariants}
          >
            Where Thoughts Resonate
          </motion.p>
        </div>

        <div className="p-8 md:p-12">
          {/* Intro */}
          <motion.section className="mb-12" variants={itemVariants}>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to <span className="font-semibold text-gray-900">Echo</span>, where words create ripples across minds. 
              We've built a sanctuary for storytellers, thinkers, and curious souls - 
              a place where your voice doesn't just speak, but <span className="italic">resonates</span>.
            </p>
          </motion.section>

          {/* Mission */}
          <motion.section className="mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif relative">
              Our Philosophy
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '✍️',
                  title: 'Empower Writers',
                  desc: 'A minimalist canvas for your thoughts with powerful tools'
                },
                {
                  icon: '👥',
                  title: 'Connect Minds',
                  desc: 'Thoughtful algorithms that match readers with your voice'
                },
                {
                  icon: '🌱',
                  title: 'Foster Growth',
                  desc: 'Resources and community to help you refine your craft'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Features */}
          <motion.section className="mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif relative">
              Why Writers Choose Echo
            </h2>
            <div className="space-y-4">
              {[
                "Zero distractions - just you and your words",
                "Built-in audience of engaged readers",
                "Modern tools with old-school writing values",
                "Monetization options when you're ready",
                "Data privacy by design"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section 
            className="text-center bg-gray-50 p-8 rounded-xl border border-gray-200"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Make Waves?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Join thousands of writers who've found their echo chamber. Whether you're sharing stories, insights, or poetry - your audience is waiting.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-800"
              >
                Start Writing Now
              </Link>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};
