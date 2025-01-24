"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const generateData = (timeRange: string) => {
  const baseData = (length: number) =>
    Array.from({ length }, (_, i) => ({
      name: `${timeRange === "1 Year" ? "Month" : "Week"} ${i + 1}`,
      stability: +(6 + Math.random() * 2).toFixed(1),
      pinkNoiseUsage: Math.floor(40 + Math.random() * 50),
    }))

  switch (timeRange) {
    case "3 Months":
      return baseData(12)
    case "1 Year":
      return baseData(12)
    default:
      return baseData(6)
  }
}

export function Overview({ timeRange }: { timeRange: string }) {
  const data = generateData(timeRange)

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          yAxisId="left"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="stability"
          name="Stability Score"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="pinkNoiseUsage"
          name="Pink Noise Usage"
          stroke="#82ca9d"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

