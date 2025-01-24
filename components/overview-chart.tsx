"use client"

import { useMemo } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { allResidents, generateResidentData } from "@/lib/data"

interface OverviewChartProps {
  className?: string
  timeRange: number
}

export function OverviewChart({ className, timeRange }: OverviewChartProps) {
  const overviewData = useMemo(() => {
    try {
      const data = Array.from({ length: timeRange }, (_, day) => ({
        day: day + 1,
        averageStability: 0,
        averagePinkNoiseUsage: 0,
      }))

      allResidents.forEach((resident) => {
        const residentData = generateResidentData(resident, timeRange)
        if (!Array.isArray(residentData) || residentData.length === 0) {
          console.error("Invalid data generated for resident:", resident)
          return
        }
        residentData.forEach((dayData, index) => {
          if (index < timeRange) {
            data[index].averageStability += (dayData.stability || 0) / allResidents.length
            data[index].averagePinkNoiseUsage += (dayData.pinkNoiseUsage || 0) / allResidents.length
          }
        })
      })

      return data.map((day) => ({
        ...day,
        averageStability: +day.averageStability.toFixed(2),
        averagePinkNoiseUsage: +day.averagePinkNoiseUsage.toFixed(2),
      }))
    } catch (error) {
      console.error("Error generating overview data:", error)
      return []
    }
  }, [timeRange])

  if (overviewData.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Stability and Pink Noise Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Stability and Pink Noise Usage Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overviewData} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" label={{ value: "Day", position: "bottom", offset: 0 }} />
              <YAxis
                yAxisId="left"
                label={{
                  value: "Average Stability Score",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  style: { textAnchor: "middle" },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Average Pink Noise Usage (%)",
                  angle: 90,
                  position: "insideRight",
                  offset: 20,
                  style: { textAnchor: "middle" },
                }}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Line yAxisId="left" type="monotone" dataKey="averageStability" stroke="#8884d8" name="Avg. Stability" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="averagePinkNoiseUsage"
                stroke="#82ca9d"
                name="Avg. Pink Noise Usage"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

