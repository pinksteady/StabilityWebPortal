"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { allResidents, generateResidentData, getFallIncidents } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ResidentsNeedingAttention({ timeRange }: { timeRange: number }) {
  const residentsNeedingAttention = useMemo(() => {
    return allResidents
      .map((resident) => {
        const recentData = generateResidentData(resident, timeRange)
        const averageStability = recentData.reduce((sum, day) => sum + day.stability, 0) / timeRange
        const averagePinkNoiseUsage = recentData.reduce((sum, day) => sum + day.pinkNoiseUsage, 0) / timeRange
        const fallIncidents = getFallIncidents(recentData)
        return {
          ...resident,
          averageStability,
          averagePinkNoiseUsage,
          fallIncidents,
          needsAttention: averageStability < resident.stabilityGoal || averagePinkNoiseUsage < 50 || fallIncidents > 0,
        }
      })
      .filter((resident) => resident.needsAttention)
      .sort((a, b) => a.averageStability - b.averageStability)
      .slice(0, 5) // Top 5 residents needing attention
  }, [timeRange])

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Residents Needing Attention</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Avg. Stability</TableHead>
              <TableHead>Avg. Pink Noise Usage</TableHead>
              <TableHead>Falls ({timeRange} days)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {residentsNeedingAttention.map((resident) => (
              <TableRow key={resident.id}>
                <TableCell className="font-medium">{resident.name}</TableCell>
                <TableCell>{resident.room}</TableCell>
                <TableCell>{resident.averageStability.toFixed(1)}</TableCell>
                <TableCell>{resident.averagePinkNoiseUsage.toFixed(1)}%</TableCell>
                <TableCell>{resident.fallIncidents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

