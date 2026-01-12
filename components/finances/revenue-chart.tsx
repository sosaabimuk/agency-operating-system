"use client"

import { motion } from "framer-motion"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { revenueData } from "@/lib/data"

export function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl border border-border bg-background-secondary/30"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-6">Revenue Trend</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOneTime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4f00" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ff4f00" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRecurring" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
            <XAxis dataKey="month" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} dy={10} />
            <YAxis
              stroke="#525252"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `€${value}`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0a0a",
                border: "1px solid #1a1a1a",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#a1a1a1" }}
              formatter={(value: number, name: string) => [
                `€${value.toLocaleString()}`,
                name === "oneTime" ? "One-time" : "Recurring",
              ]}
            />
            <Area
              type="monotone"
              dataKey="recurring"
              stroke="#22c55e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRecurring)"
            />
            <Area
              type="monotone"
              dataKey="oneTime"
              stroke="#ff4f00"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOneTime)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-xs text-foreground-muted">One-time Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-xs text-foreground-muted">Recurring Revenue</span>
        </div>
      </div>
    </motion.div>
  )
}
