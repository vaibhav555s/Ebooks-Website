"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Define skill categories and their skills
const skillCategories = [
  {
    name: "Programming Languages",
    color: "#f97316", // Orange
    skills: [
      { name: "C", level: 85 },
      { name: "C++", level: 80 },
      { name: "Java", level: 90 },
      { name: "Python", level: 85 },
    ],
  },
  {
    name: "Web Technologies",
    color: "#ec4899", // Pink
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 92 },
      { name: "React.js", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 82 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    name: "Database & Infrastructure",
    color: "#8b5cf6", // Purple
    skills: [
      { name: "SQL", level: 85 },
      { name: "ThingSpeak", level: 80 },
    ],
  },
  {
    name: "Mobile Development",
    color: "#06b6d4", // Cyan
    skills: [
      { name: "Android Development", level: 82 },
      { name: "Java", level: 90 },
    ],
  },
  {
    name: "AI/ML",
    color: "#10b981", // Emerald
    skills: [
      { name: "Data Visualization", level: 85 },
      { name: "Data Analytics", level: 80 },
      { name: "Data Science", level: 75 },
    ],
  },
];

export default function SkillsGalaxy() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on mount and window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: Math.max(600, window.innerHeight * 0.6),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Generate positions for skill nodes
  const generatePositions = () => {
    const positions = {};
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // Position category nodes in a circle around the center
    const categoryRadius = Math.min(dimensions.width, dimensions.height) * 0.25;
    skillCategories.forEach((category, i) => {
      const angle = (i * 2 * Math.PI) / skillCategories.length;
      const x = centerX + categoryRadius * Math.cos(angle);
      const y = centerY + categoryRadius * Math.sin(angle);
      positions[category.name] = { x, y };

      // Position skill nodes around their category
      const skillRadius = categoryRadius * 0.6;
      category.skills.forEach((skill, j) => {
        const skillAngle =
          angle +
          ((j - (category.skills.length - 1) / 2) * Math.PI) /
            (category.skills.length + 1);
        const skillX = x + skillRadius * Math.cos(skillAngle);
        const skillY = y + skillRadius * Math.sin(skillAngle);
        positions[`${category.name}-${skill.name}`] = { x: skillX, y: skillY };
      });
    });

    return positions;
  };

  const positions = generatePositions();

  // Generate connections between nodes
  const generateConnections = () => {
    const connections = [];

    // Connect categories to center
    skillCategories.forEach((category) => {
      connections.push({
        from: "center",
        to: category.name,
        color: category.color,
        width: 2,
        active: activeCategory === category.name || activeCategory === null,
      });

      // Connect skills to their category
      category.skills.forEach((skill) => {
        connections.push({
          from: category.name,
          to: `${category.name}-${skill.name}`,
          color: category.color,
          width: 1,
          active:
            activeCategory === category.name ||
            (activeCategory === null &&
              (hoveredSkill === skill.name || hoveredSkill === null)),
        });
      });
    });

    return connections;
  };

  const connections = generateConnections();

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: dimensions.height }}
      onMouseLeave={() => {
        setActiveCategory(null);
        setHoveredSkill(null);
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 rounded-3xl glass border border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 paper-texture opacity-5"></div>
      </div>

      {/* Center node */}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold z-20"
        style={{
          left: dimensions.width / 2 - 32,
          top: dimensions.height / 2 - 32,
          boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        Skills
      </motion.div>

      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {connections.map((connection, index) => {
          const fromPos =
            connection.from === "center"
              ? { x: dimensions.width / 2, y: dimensions.height / 2 }
              : positions[connection.from];
          const toPos = positions[connection.to];

          if (!fromPos || !toPos) return null;

          return (
            <motion.line
              key={index}
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke={
                connection.active
                  ? connection.color
                  : "rgba(255, 255, 255, 0.1)"
              }
              strokeWidth={connection.width}
              strokeDasharray={connection.active ? "none" : "5,5"}
              initial={{ opacity: 0 }}
              animate={{ opacity: connection.active ? 0.7 : 0.1 }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
      </svg>

      {/* Category nodes */}
      {skillCategories.map((category) => {
        const pos = positions[category.name];
        if (!pos) return null;

        return (
          <motion.div
            key={category.name}
            className="absolute rounded-full flex items-center justify-center text-white font-medium z-20 cursor-pointer"
            style={{
              left: pos.x - 40,
              top: pos.y - 40,
              width: 80,
              height: 80,
              background: `linear-gradient(135deg, ${category.color}, ${category.color}aa)`,
              boxShadow:
                activeCategory === category.name
                  ? `0 0 20px ${category.color}`
                  : "none",
            }}
            animate={{
              scale:
                activeCategory === category.name || activeCategory === null
                  ? 1
                  : 0.8,
              opacity:
                activeCategory === category.name || activeCategory === null
                  ? 1
                  : 0.5,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            onClick={() =>
              setActiveCategory(
                activeCategory === category.name ? null : category.name
              )
            }
          >
            <div className="text-center px-2 text-sm">{category.name}</div>
          </motion.div>
        );
      })}

      {/* Skill nodes */}
      {skillCategories.map((category) =>
        category.skills.map((skill) => {
          const pos = positions[`${category.name}-${skill.name}`];
          if (!pos) return null;

          const isActive =
            activeCategory === category.name ||
            (activeCategory === null &&
              (hoveredSkill === skill.name || hoveredSkill === null));

          return (
            <motion.div
              key={`${category.name}-${skill.name}`}
              className="absolute rounded-full flex items-center justify-center text-white text-xs font-medium z-20 cursor-pointer"
              style={{
                left: pos.x - 30,
                top: pos.y - 30,
                width: 60,
                height: 60,
                background: `rgba(23, 23, 23, 0.8)`,
                border: `2px solid ${category.color}`,
              }}
              animate={{
                scale: isActive ? 1 : 0.6,
                opacity: isActive ? 1 : 0.3,
                boxShadow:
                  hoveredSkill === skill.name
                    ? `0 0 15px ${category.color}`
                    : "none",
              }}
              whileHover={{
                scale: 1.15,
                boxShadow: `0 0 15px ${category.color}`,
              }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="text-center px-1">{skill.name}</div>

              {/* Skill level indicator */}
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                style={{
                  width: `${(skill.level / 100) * 50}px`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(skill.level / 100) * 50}px` }}
                transition={{ duration: 1, delay: 0.2 }}
              />

              {/* Skill level popup on hover */}
              {hoveredSkill === skill.name && (
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Proficiency: {skill.level}%
                </motion.div>
              )}
            </motion.div>
          );
        })
      )}

      {/* Floating particles for ambient effect */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.2,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass border border-zinc-700 rounded-lg p-3 text-xs">
        <div className="text-zinc-300 mb-2">Skill Proficiency</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-zinc-400">Expert (90-100%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-zinc-400">Advanced (80-89%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-zinc-400">Intermediate (70-79%)</span>
        </div>
      </div>
    </div>
  );
}
