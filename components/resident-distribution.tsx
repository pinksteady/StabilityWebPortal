"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { allResidents } from "@/lib/data"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="#333333"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      <tspan x={x} dy="-0.8em">
        {name}
      </tspan>
      <tspan x={x} dy="1.6em">{`${(percent * 100).toFixed(0)}%`}</tspan>
    </text>
  )
}

export function ResidentDistribution() {
  const distribution = useMemo(() => {
    const dist = { Low: 0, Medium: 0, High: 0 }
    allResidents.forEach((resident) => {
      dist[resident.pinkNoiseUsage]++
    })
    return Object.entries(dist).map(([name, value]) => ({ name, value }))
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resident Distribution by Pink Noise Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

