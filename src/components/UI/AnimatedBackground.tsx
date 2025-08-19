import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden wave-bg">
      
      {/* Floating Academic Icons */}
      <motion.div
        className="absolute top-20 left-20 text-blue-400 opacity-20"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/4 right-1/4 text-purple-400 opacity-20"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/3 text-blue-300 opacity-15"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-3/4 right-20 text-purple-300 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-1/3 text-blue-400 opacity-15"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M5,19V5H19V19H5M17,17H7V15H17V17M17,13H7V11H17V13M17,9H7V7H17V9Z"/>
        </svg>
      </motion.div>

      {/* Floating Particles */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.8,
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/6 left-1/6 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #4F9DFF 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/6 right-1/6 w-80 h-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #A367FF 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
