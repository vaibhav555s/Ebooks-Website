
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Mail, Users, MessageSquare, Code, BookOpen, Clock } from 'lucide-react';

const CommunityEngagement = () => {
  const [email, setEmail] = useState('');
  const [storyIdea, setStoryIdea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStorySubmission = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      setStoryIdea('');
      alert('Thank you! We\'ll review your story idea and get back to you within 24 hours.');
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Join Our Storytelling Community
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Have an amazing story to share? Want to contribute to StoryWave's growth? 
            We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Story Submission Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-lg border border-orange-100 dark:border-orange-900/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Share Your Story
              </h3>
            </div>
            
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Got an incredible story idea? We're always looking for fresh, engaging content 
              to feature on StoryWave. Share your concept with us!
            </p>

            <form onSubmit={handleStorySubmission} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Your Story Idea
                </label>
                <textarea
                  value={storyIdea}
                  onChange={(e) => setStoryIdea(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your story idea, characters, theme, or concept..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-medium disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Story Idea
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Clock size={16} />
                <span className="font-medium">Quick Response Promise</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                We'll review your submission and get back to you within 24 hours!
              </p>
            </div>
          </motion.div>

          {/* Developer Contribution Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-900/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Contribute as a Developer
              </h3>
            </div>
            
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Are you a developer who loves storytelling? Help us make StoryWave even better! 
              Contribute to our open-source project and be part of our journey.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Github className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-1" />
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-white">Open Source Project</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Fork our repository, submit pull requests, and help improve the platform
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-1" />
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-white">Community Driven</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Join discussions, report bugs, and suggest new features
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium"
              >
                <Github size={18} />
                View on GitHub
              </a>
              
              <a
                href="mailto:vaibhavsonawane2345@gmail.com?subject=Developer Contribution - StoryWave"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 font-medium"
              >
                <Mail size={18} />
                Get in Touch
              </a>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <MessageSquare size={16} />
                <span className="font-medium">Let's Collaborate</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                Whether you're a beginner or expert, all contributions are welcome!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
            Multiple Ways to Connect
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:vaibhavsonawane2345@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors"
            >
              <Mail size={16} />
              Email Us
            </a>
            
            <a
              href="https://www.instagram.com/vaibhavsonawane_05/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800/50 transition-colors"
            >
              <MessageSquare size={16} />
              DM on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityEngagement;
