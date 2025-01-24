"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const generateData = (timeRange: string) => {
  const baseData = [
    { usage: 40, stability: 5.8 },
    { usage: 45, stability: 6.1 },
    { usage: 50, stability: 6.5 },
    { usage: 55, stability: 6.8 },
    { usage: 60, stability: 7.0 },
    { usage: 65, stability: 7.2 },
    { usage: 70, stability: 7.4 },
  ]

  switch (timeRange) {
    case "3 Months":
      return [
        ...baseData,
        ...Array.from({ length: 5 }, (_, i) => ({
          usage: 75 + i * 5,
          stability: (7.4 + Math.random() * 0.5).toFixed(1),
        })),
      ]
    case "1 Year":
      return [
        ...baseData,
        ...Array.from({ length: 10 }, (_, i) => ({
          usage: 75 + i * 5,
          stability: (7.4 + Math.random() * 1).toFixed(1),
        })),
      ]
    default:
      return baseData
  }
}

export function PinkNoiseUsage({ timeRange }: { timeRange: string }) {
  const data = generateData(timeRange)

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="usage" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="stability" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

