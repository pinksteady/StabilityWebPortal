"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { allResidents, generateResidentData } from "@/lib/data"

export function FallIncidentsTrendChart({ timeRange }: { timeRange: number }) {
  const data = useMemo(() => {
    const dailyFalls = new Array(timeRange).fill(0)
    allResidents.forEach((resident) => {
      const residentData = generateResidentData(resident, timeRange)
      residentData.forEach((day, index) => {
        if (day.fallData.occurred) {
          dailyFalls[index]++
        }
      })
    })
    return dailyFalls.map((falls, index) => ({ day: index + 1, falls }))
  }, [timeRange])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fall Incidents Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis
                dataKey="day"
                type="number"
                domain={[1, timeRange]}
                tickCount={6}
                label={{ value: "Day", position: "bottom", offset: 5 }}
                stroke="hsl(var(--foreground))"
              />
              <YAxis
                label={{ value: "Fall Incidents", angle: -90, position: "insideLeft", offset: -5 }}
                stroke="hsl(var(--foreground))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2">
                        <p className="text-sm font-medium">Day: {label}</p>
                        <p className="text-sm font-medium">Fall Incidents: {payload[0].value}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="falls"
                stroke="hsl(280, 60%, 50%)"
                strokeWidth={2}
                dot={{
                  fill: "hsl(280, 60%, 50%)",
                  stroke: "hsl(280, 60%, 40%)",
                  strokeWidth: 1,
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  stroke: "hsl(280, 60%, 40%)",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

