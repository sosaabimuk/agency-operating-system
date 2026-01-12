"use client"

import { motion } from "framer-motion"

export function AmbientSpace() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Background - Gradient von Dunkelblau-Schwarz zu Reinschwarz */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #020206 0%, #000000 50%, #020204 100%)",
        }}
      />

      {/* Noise Texture Overlay - filmische Körnung */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient Orb 1 - Accent Orange, oben rechts */}
      <motion.div
        className="ambient-orb absolute -top-[400px] -right-[300px] w-[1000px] h-[1000px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,79,0,0.07) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* Ambient Orb 2 - Subtle Blue, unten links */}
      <motion.div
        className="ambient-orb-delayed absolute -bottom-[500px] -left-[400px] w-[1200px] h-[1200px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      {/* Ambient Orb 3 - Very Subtle Green, Mitte */}
      <motion.div
        className="ambient-orb absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.025) 0%, transparent 50%)",
          filter: "blur(80px)",
          animationDuration: "60s",
        }}
      />

      {/* Top Edge Glow - subtiler Lichtschein */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,79,0,0.1), transparent)",
        }}
      />
    </div>
  )
}
