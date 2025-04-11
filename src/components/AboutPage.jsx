"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  BookOpen,
  Heart,
} from "lucide-react";
import Navbar from "./Navbar3";
import Footer from "./Footer";
import {Link} from "react-router-dom";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Create particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  // Skills data
  const skills = [
    { name: "UI/UX Design", level: 90 },
    { name: "Frontend Development", level: 85 },
    { name: "React & Next.js", level: 95 },
    { name: "Animation", level: 80 },
    { name: "Responsive Design", level: 90 },
    { name: "Storytelling", level: 75 },
  ];

  // Projects data
  const projects = [
    {
      title: "StoryWave Platform",
      description:
        "An immersive storytelling platform with dark theme and animated elements",
      tags: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
      link: "/",
    },
    {
      title: "Interactive Reader",
      description:
        "A distraction-free reading experience with customizable settings",
      tags: ["React", "Animation", "Accessibility"],
      link: "/reader/1",
    },
    {
      title: "Feedback System",
      description: "Modern feedback collection system with visual analytics",
      tags: ["Next.js", "Google Sheets API", "UI/UX"],
      link: "/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      <Navbar />

      <main ref={containerRef} className="relative pt-20 pb-24">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 paper-texture opacity-5"></div>

          {/* Animated gradient */}
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{ y }}
          />

          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
            style={{ y: useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]) }}
          />

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: 0.1,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, particle.id % 2 === 0 ? 10 : -10, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
                Meet the Developer
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Crafting immersive digital experiences through code and creativity
            </motion.p>
          </motion.div>

          {/* Profile Section */}
          <div className="max-w-5xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="relative w-64 h-64 mx-auto md:ml-auto md:mr-0">
                  {/* Glowing border */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-70 blur-sm"></div>

                  {/* Image container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-zinc-800">
                    <img
                      src="/placeholder.svg?height=256&width=256"
                      alt="Developer Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-orange-500"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <Code size={20} />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-pink-500"
                    animate={{
                      y: [0, 5, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: 1,
                    }}
                  >
                    <BookOpen size={20} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-white">Vaibhav Sonawane</h2>

                <p className="text-zinc-300">
                  Frontend Developer & UI/UX Designer with a passion for
                  creating immersive digital experiences. Specializing in
                  interactive storytelling platforms and modern web
                  applications.
                </p>

                {/* Quote */}
                <blockquote className="border-l-2 border-orange-500 pl-4 italic text-zinc-400">
                  "I believe that technology should enhance storytelling, not
                  distract from it. My mission is to create digital spaces where
                  narratives can truly come alive."
                </blockquote>

                {/* Contact links */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-2 hover:bg-zinc-700 transition-colors duration-300"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-2 hover:bg-zinc-700 transition-colors duration-300"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="mailto:alex@storywave.com"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center gap-2 hover:opacity-90 transition-opacity duration-300"
                  >
                    <Mail size={16} />
                    <span>Contact Me</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Skills Section */}
          <motion.div
            className="max-w-5xl mx-auto mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
                Skills & Expertise
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-zinc-400">{skill.level}%</span>
                  </div>

                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            className="max-w-5xl mx-auto mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
                Featured Projects
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="glass border border-zinc-800 rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px -5px rgba(249, 115, 22, 0.2)",
                  }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link href={project.link}>
                      <motion.button
                        className="w-full py-2 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors duration-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>View Project</span>
                        <ExternalLink size={14} />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass border border-zinc-800 rounded-2xl p-8 md:p-12">
              <motion.div
                className="inline-flex mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Heart size={40} className="text-pink-500" />
              </motion.div>

              <h2 className="text-3xl font-bold mb-4 text-white">
                Let's Create Something Amazing
              </h2>
              <p className="text-zinc-300 mb-8">
                I'm always open to new projects and collaborations. Whether you
                have a specific idea or just want to explore possibilities, I'd
                love to hear from you.
              </p>

              <a
                href="mailto:alex@storywave.com"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium text-lg shadow-lg glow-border-orange"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
