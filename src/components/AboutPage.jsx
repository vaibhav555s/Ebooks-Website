"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Phone, MapPin, Send, ExternalLink, Award, Calendar, Code, Instagram } from 'lucide-react'
import Navbar from "./Navbar3"
import Footer from "./Footer"
import SkillsGalaxy from "./skills-galaxy"
import {Link} from "react-router-dom"
// import profilePic from "../assets/profile.jpeg"
export default function AboutPage() {
  const containerRef = useRef(null)
  const [activeTab, setActiveTab] = useState("experience")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  // Create particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  // Education data
  const education = [
    {
      degree: "BTech in Artificial Intelligence and Machine Learning",
      institution: "Thakur College of Engineering and Technology",
      location: "Mumbai, India",
      period: "Sep 2024 - Apr 2027",
      achievement: "CGPA: 10.00/10",
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "St. John's College of Engineering and Management",
      location: "Palghar, Mumbai, India",
      period: "Aug 2021 - June 2024",
      achievement: "1st Ranker in Final Year AY-2023-2024",
    },
  ]

  // Experience data
  const experience = [
    {
      role: "Machine Learning & Web Development Intern",
      company: "SoundSafe.AI",
      period: "Jan 2025 - Present",
      description:
        "Enhancing an AI-driven audio watermarking system and developing a web application with modern technologies.",
      technologies: ["Python", "TensorFlow", "React", "Node.js"],
    },
    {
      role: "Web Developer Intern",
      company: "BWC Advisory Solutions LLP",
      period: "June 2023 - July 2023",
      description:
        "Built responsive websites applying front-end best practices and gained real-world project experience.",
      technologies: ["HTML/CSS", "JavaScript", "Responsive Design"],
    },
  ]

  // Achievements data
  const achievements = [
    {
      title: "Competitive Programming Winner",
      description: "2x winner in regional coding competitions",
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: "UI/UX Website Design Competition",
      description: "1st Runner-up in national design challenge",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "Blind C language Coding Competition",
      description: "1st Runner-up in national level Blind C programming competition",
      icon: <Code className="w-6 h-6" />,
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus("sending")

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
      setFormData({ name: "", email: "", message: "" })

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus(null)
      }, 3000)
    }, 1500)
  }

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
            className="text-center mb-16"
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

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Vaibhav Sonawane
            </motion.h2>
          </motion.div>

          {/* Profile Section */}
          <div className="max-w-6xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="relative w-64 h-64 mx-auto md:ml-auto md:mr-0">
                  {/* Animated glowing border */}
                  <motion.div
                    className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-70 blur-sm"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 0.9, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  ></motion.div>

                  {/* Image container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-zinc-800">
                    {/* <img
                      src={profilePic}
                      alt="Vaibhav Sonawane"
                      className="w-full h-full object-cover scale-150 mt-14"
                    /> */}
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full glass border border-zinc-700 flex items-center justify-center text-orange-500"
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
                    className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full glass border border-zinc-700 flex items-center justify-center text-pink-500"
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
                    <Calendar size={20} />
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
                <h2 className="text-3xl font-bold text-white">
                  Full Stack Developer & AI Enthusiast
                </h2>

                <p className="text-zinc-300">
                  Passionate about creating immersive digital experiences that
                  blend technical excellence with creative vision. Specializing
                  in web development, machine learning, and interactive
                  storytelling platforms.
                </p>

                {/* Quote */}
                <motion.blockquote
                  className="relative p-6 glass border-l-4 border-orange-500 rounded-r-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="absolute -top-3 -left-3 text-orange-500 text-4xl opacity-50">
                    "
                  </div>
                  <p className="italic text-zinc-300 text-lg relative z-10">
                    Combining technical expertise with creative vision to build
                    immersive digital experiences
                  </p>
                  <div className="absolute -bottom-3 -right-3 text-orange-500 text-4xl opacity-50">
                    "
                  </div>
                </motion.blockquote>

                {/* Contact links */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.a
                    href="https://github.com/vaibhav555s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full glass border border-zinc-700 flex items-center gap-2 hover:border-orange-500 transition-colors duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github
                      size={16}
                      className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300"
                    />
                    <span>GitHub</span>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/vaibhavsonawane1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full glass border border-zinc-700 flex items-center gap-2 hover:border-orange-500 transition-colors duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin
                      size={16}
                      className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300"
                    />
                    <span>LinkedIn</span>
                  </motion.a>

                  <motion.a
                    href="mailto:vaibhavsonawane2345@gmail.com"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center gap-2 hover:opacity-90 transition-opacity duration-300 glow-border-orange"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={16} />
                    <span>Contact Me</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "experience",
                "education",
                "achievements",
                "contact Details",
              ].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white glow-border-orange"
                      : "glass border border-zinc-700 text-zinc-300 hover:border-orange-500"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="max-w-6xl mx-auto">
            {/* Skills Section */}
            <AnimatePresence mode="wait">
              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[600px]"
                >
                  <h2 className="text-3xl font-bold mb-12 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
                      Skills Galaxy
                    </span>
                  </h2>

                  <SkillsGalaxy />
                </motion.div>
              )}

              {/* Education Section */}
              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[600px]"
                >
                  <h2 className="text-3xl font-bold mb-12 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
                      Educational Journey
                    </span>
                  </h2>

                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-zinc-800"></div>

                    {/* Education items */}
                    {education.map((item, index) => (
                      <motion.div
                        key={index}
                        className={`relative mb-16 ${
                          index % 2 === 0
                            ? "md:pr-12 md:text-right md:mr-[50%]"
                            : "md:pl-12 md:ml-[50%]"
                        }`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        {/* Timeline dot */}
                        <motion.div
                          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 z-10 glow-border-orange"
                          whileHover={{ scale: 1.5 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        />

                        {/* Content card */}
                        <motion.div
                          className="glass border border-zinc-700 rounded-xl p-6 shadow-lg inline-block max-w-md"
                          whileHover={{
                            y: -5,
                            boxShadow:
                              "0 10px 25px -5px rgba(249, 115, 22, 0.2)",
                          }}
                        >
                          <div className="text-sm font-semibold text-orange-500 mb-2">
                            {item.period}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {item.degree}
                          </h3>
                          <p className="text-zinc-300 mb-1">
                            {item.institution}
                          </p>
                          <p className="text-zinc-400 text-sm mb-3">
                            {item.location}
                          </p>
                          <div className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-orange-400 text-sm font-medium">
                            {item.achievement}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Experience Section */}
              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[600px]"
                >
                  <h2 className="text-3xl font-bold mb-12 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
                      Professional Experience
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {experience.map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <motion.div
                          className="glass border border-zinc-700 rounded-xl p-6 h-full"
                          whileHover={{
                            y: -5,
                            boxShadow:
                              "0 10px 25px -5px rgba(249, 115, 22, 0.2)",
                          }}
                        >
                          {/* Timeline indicator */}
                          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hidden md:block"></div>

                          <div className="text-sm font-semibold text-orange-500 mb-2">
                            {item.period}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {item.role}
                          </h3>
                          <p className="text-zinc-300 mb-4">{item.company}</p>
                          <p className="text-zinc-400 mb-4">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Achievements Section */}
              {activeTab === "achievements" && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[600px]"
                >
                  <h2 className="text-3xl font-bold mb-12 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
                      Achievements & Awards
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {achievements.map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <motion.div
                          className="glass border border-zinc-700 rounded-xl p-6 flex items-start gap-4"
                          whileHover={{
                            y: -5,
                            boxShadow:
                              "0 10px 25px -5px rgba(249, 115, 22, 0.2)",
                            borderColor: "#f97316",
                          }}
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white">
                            {item.icon}
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">
                              {item.title}
                            </h3>
                            <p className="text-zinc-400">{item.description}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Contact Section */}
              {activeTab === "contact Details" && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-[600px]"
                >
                  <h2 className="text-3xl font-bold mb-12 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
                      Get In Touch
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                      className="glass border border-zinc-700 rounded-xl p-8"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-6">
                        Send Me a Message
                      </h3>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-zinc-300 block text-sm font-medium"
                          >
                            Your Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
                              placeholder="Enter your name"
                            />
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-sm transition-opacity duration-300"></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-zinc-300 block text-sm font-medium"
                          >
                            Your Email
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
                              placeholder="Enter your email"
                            />
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-sm transition-opacity duration-300"></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="message"
                            className="text-zinc-300 block text-sm font-medium"
                          >
                            Your Message
                          </label>
                          <div className="relative">
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              required
                              rows={5}
                              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 resize-none"
                              placeholder="Enter your message"
                            ></textarea>
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-sm transition-opacity duration-300"></div>
                          </div>
                        </div>

                        <motion.button
                          type="submit"
                          className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium flex items-center justify-center gap-2 glow-border-orange"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={formStatus === "sending"}
                        >
                          {formStatus === "sending" ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }}
                              />
                              <span>Sending...</span>
                            </>
                          ) : formStatus === "success" ? (
                            <>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 15,
                                }}
                              >
                                ✓
                              </motion.div>
                              <span>Message Sent!</span>
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              <span>Send Message</span>
                            </>
                          )}
                        </motion.button>
                      </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                      className="space-y-8"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-6">
                        Contact Information
                      </h3>

                      <div className="space-y-6">
                        <motion.a
                          href="mailto:vaibhavsonawane2345@gmail.com"
                          className="flex items-center gap-4 group"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-12 h-12 rounded-full glass border border-zinc-700 flex items-center justify-center group-hover:border-orange-500 transition-colors duration-300">
                            <Mail
                              size={20}
                              className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300"
                            />
                          </div>
                          <div>
                            <p className="text-zinc-400 text-sm">Email</p>
                            <p className="text-white group-hover:text-orange-500 transition-colors duration-300">
                              vaibhavsonawane2345@gmail.com
                            </p>
                          </div>
                        </motion.a>

                        <motion.a
                          href="tel:+917775958131"
                          className="flex items-center gap-4 group"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-12 h-12 rounded-full glass border border-zinc-700 flex items-center justify-center group-hover:border-orange-500 transition-colors duration-300">
                            <Phone
                              size={20}
                              className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300"
                            />
                          </div>
                          <div>
                            <p className="text-zinc-400 text-sm">Phone</p>
                            <p className="text-white group-hover:text-orange-500 transition-colors duration-300">
                              +91 777 595 8131
                            </p>
                          </div>
                        </motion.a>

                        <motion.div
                          className="flex items-center gap-4 group"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-12 h-12 rounded-full glass border border-zinc-700 flex items-center justify-center group-hover:border-orange-500 transition-colors duration-300">
                            <MapPin
                              size={20}
                              className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300"
                            />
                          </div>
                          <div>
                            <p className="text-zinc-400 text-sm">Location</p>
                            <p className="text-white group-hover:text-orange-500 transition-colors duration-300">
                              Mumbai, India
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Social Links */}
                      <div className="pt-8">
                        <h4 className="text-lg font-medium text-white mb-4">
                          Connect With Me
                        </h4>
                        <div className="flex gap-4">
                          <motion.a
                            href="https://www.linkedin.com/in/vaibhavsonawane1/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full glass border border-zinc-700 flex items-center justify-center hover:border-orange-500 transition-colors duration-300 group"
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Linkedin
                              size={20}
                              className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300"
                            />
                          </motion.a>

                          <motion.a
                            href="https://github.com/vaibhav555s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full glass border border-zinc-700 flex items-center justify-center hover:border-orange-500 transition-colors duration-300 group"
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github
                              size={20}
                              className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300"
                            />
                          </motion.a>

                          <motion.a
                            href="mailto:vaibhavsonawane2345@gmail.com"
                            className="w-12 h-12 rounded-full glass border border-zinc-700 flex items-center justify-center hover:border-orange-500 transition-colors duration-300 group"
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Mail
                              size={20}
                              className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300"
                            />
                          </motion.a>
                          <motion.a
                            href="https://www.instagram.com/vaibhavsonawane_05/#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full glass border border-zinc-700 flex items-center justify-center hover:border-orange-500 transition-colors duration-300 group"
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Instagram
                              size={20}
                              className="text-zinc-400 group-hover:text-orange-500 transition-colors duration-300"
                            />
                          </motion.a>
                        </div>
                      </div>

                      {/* Map Placeholder */}
                      <div className="mt-8 rounded-xl overflow-hidden border border-zinc-700 h-64 relative">
                        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                          <p className="text-zinc-400">
                            Interactive Map Coming Soon
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
