"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChart } from "@/components/overview-chart"
import { RecentAlerts } from "@/components/recent-alerts"
import { ResidentList } from "@/components/resident-list"
import { ResidentsNeedingAttention } from "@/components/residents-needing-attention"
import { ResidentDistribution } from "@/components/resident-distribution"
import { StabilityVsUsageChart } from "@/components/stability-vs-usage-chart"
import { FallIncidentsTrendChart } from "@/components/fall-incidents-trend-chart"
import { NotificationCenter } from "@/components/notification-center"
import { UserManagement } from "@/components/user-management"
import { Button } from "@/components/ui/button"
import { allResidents, generateResidentData, getFallIncidents } from "@/lib/data"
import ErrorBoundary from "@/components/error-boundary"
import { TimeRangeSlider } from "@/components/time-range-slider"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState(30)
  const [showUserManagement, setShowUserManagement] = useState(false)

  const handleTimeRangeChange = useCallback((newValue: number) => {
    setTimeRange(newValue)
  }, [])

  const stats = useMemo(() => {
    try {
      const allData = allResidents.flatMap((resident) => {
        const residentData = generateResidentData(resident, timeRange)
        if (!Array.isArray(residentData) || residentData.length === 0) {
          console.error("Invalid data generated for resident:", resident)
          return []
        }
        return residentData
      })

      if (allData.length === 0) {
        console.error("No valid data generated for any residents")
        return { totalResidents: 0, averageStability: 0, averagePinkNoiseUsage: 0, totalFalls: 0 }
      }

      const totalResidents = allResidents.length
      const averageStability =
        allData.reduce((sum, day) => {
          if (typeof day.stability !== "number") {
            console.error("Invalid stability value:", day.stability)
            return sum
          }
          return sum + day.stability
        }, 0) / allData.length
      const averagePinkNoiseUsage =
        allData.reduce((sum, day) => {
          if (typeof day.pinkNoiseUsage !== "number") {
            console.error("Invalid pinkNoiseUsage value:", day.pinkNoiseUsage)
            return sum
          }
          return sum + day.pinkNoiseUsage
        }, 0) / allData.length
      const totalFalls = getFallIncidents(allData)

      return { totalResidents, averageStability, averagePinkNoiseUsage, totalFalls }
    } catch (error) {
      console.error("Error calculating stats:", error)
      return { totalResidents: 0, averageStability: 0, averagePinkNoiseUsage: 0, totalFalls: 0 }
    }
  }, [timeRange])

  return (
    <ErrorBoundary>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-3xl font-bold tracking-tight">Stability Web Portal</h1>
            <div className="ml-auto flex items-center space-x-4">
              <NotificationCenter />
              <Button onClick={() => setShowUserManagement(!showUserManagement)} variant="outline">
                {showUserManagement ? "Hide" : "Show"} User Management
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <TimeRangeSlider value={timeRange} onValueChange={handleTimeRangeChange} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalResidents}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Stability Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageStability.toFixed(1)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Pink Noise Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averagePinkNoiseUsage.toFixed(1)}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fall Incidents ({timeRange} days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalFalls}</div>
              </CardContent>
            </Card>
          </div>
          <ErrorBoundary>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
              <OverviewChart className="lg:col-span-3" timeRange={timeRange} />
              <ResidentDistribution />
            </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <div className="grid gap-4 md:grid-cols-1">
              <StabilityVsUsageChart timeRange={timeRange} />
              <FallIncidentsTrendChart timeRange={timeRange} />
            </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <ResidentsNeedingAttention className="lg:col-span-4" timeRange={timeRange} />
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentAlerts />
                </CardContent>
              </Card>
            </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-7">
                <CardHeader>
                  <CardTitle>Resident List</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResidentList />
                </CardContent>
              </Card>
            </div>
          </ErrorBoundary>
          {showUserManagement && (
            <ErrorBoundary>
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserManagement />
                </CardContent>
              </Card>
            </ErrorBoundary>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}

