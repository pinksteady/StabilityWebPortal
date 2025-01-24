"use client"

import { useMemo } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { allResidents, generateResidentData } from "@/lib/data"

export function StabilityVsUsageChart({ timeRange }: { timeRange: number }) {
  const data = useMemo(() => {
    return allResidents.flatMap((resident) => {
      const residentData = generateResidentData(resident, timeRange)
      return residentData.map((day) => ({
        pinkNoiseUsage: day.pinkNoiseUsage,
        stabilityScore: day.stability,
      }))
    })
  }, [timeRange])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stability Score vs. Pink Noise Usage</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis
                type="number"
                dataKey="pinkNoiseUsage"
                name="Pink Noise Usage"
                unit="%"
                domain={[0, 100]}
                tickCount={5}
                label={{ value: "Pink Noise Usage (%)", position: "bottom", offset: 0 }}
                stroke="hsl(var(--foreground))"
              />
              <YAxis
                type="number"
                dataKey="stabilityScore"
                name="Stability Score"
                domain={[0, 10]}
                tickCount={6}
                label={{
                  value: "Stability Score",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  style: { textAnchor: "middle" },
                }}
                stroke="hsl(var(--foreground))"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                type="number"
                domain={[0, 10]}
                tickCount={6}
                label={{
                  value: "Stability Score",
                  angle: 90,
                  position: "insideRight",
                  offset: 10,
                  style: { textAnchor: "middle" },
                }}
                stroke="hsl(var(--foreground))"
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2">
                        <p className="text-sm font-medium">Pink Noise Usage: {payload[0].value.toFixed(2)}%</p>
                        <p className="text-sm font-medium">Stability Score: {payload[1].value.toFixed(2)}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Scatter name="Residents" data={data} fill="hsl(170, 70%, 50%)" stroke="hsl(170, 70%, 40%)" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

