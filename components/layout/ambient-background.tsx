"use client"

import { motion } from "framer-motion"

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050508] to-black" />

      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient Orb 1 - Accent Color */}
      <motion.div
        initial={{ opacity: 0.05 }}
        animate={{
          opacity: [0.05, 0.08, 0.05],
          scale: [1, 1.05, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute -top-[300px] -right-[200px] w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,79,0,0.1) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Ambient Orb 2 - Subtle Blue */}
      <motion.div
        initial={{ opacity: 0.03 }}
        animate={{
          opacity: [0.03, 0.05, 0.03],
          scale: [1, 1.1, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute -bottom-[400px] -left-[300px] w-[900px] h-[900px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Ambient Orb 3 - Very Subtle Green */}
      <motion.div
        initial={{ opacity: 0.02 }}
        animate={{
          opacity: [0.02, 0.04, 0.02],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 10,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  )
}
