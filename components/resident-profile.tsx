"use client"

import { useState, useEffect, useMemo } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ChevronLeft, Printer } from "lucide-react"
import { allResidents, generateResidentData, getLatestData, type Resident, type HealthMetric } from "@/lib/data"
import ErrorBoundary from "./error-boundary"

const calculatePercentageChange = (initial: number, current: number) => {
  if (typeof initial !== "number" || typeof current !== "number") {
    return "N/A"
  }
  const change = ((current - initial) / initial) * 100
  return (change >= 0 ? "+" : "") + change.toFixed(1)
}

export function ResidentProfile({ initialResident }: { initialResident: Resident }) {
  const [selectedResident, setSelectedResident] = useState(initialResident)
  const [residentData, setResidentData] = useState(generateResidentData(selectedResident, 30))
  const [filter, setFilter] = useState<"All" | "Low" | "Medium" | "High">("All")
  const [note, setNote] = useState("")
  const [stabilityGoal, setStabilityGoal] = useState(selectedResident.stabilityGoal)

  const filteredResidents = useMemo(() => {
    return filter === "All" ? allResidents : allResidents.filter((resident) => resident.pinkNoiseUsage === filter)
  }, [filter])

  useEffect(() => {
    setResidentData(generateResidentData(selectedResident, 30))
    setStabilityGoal(selectedResident.stabilityGoal)
  }, [selectedResident])

  const handleResidentChange = (residentId: string) => {
    const newResident = allResidents.find((r) => r.id.toString() === residentId)
    if (newResident) {
      setSelectedResident(newResident)
    }
  }

  const handlePreviousResident = () => {
    const currentIndex = filteredResidents.findIndex((r) => r.id === selectedResident.id)
    const previousIndex = (currentIndex - 1 + filteredResidents.length) % filteredResidents.length
    setSelectedResident(filteredResidents[previousIndex])
  }

  const handleNextResident = () => {
    const currentIndex = filteredResidents.findIndex((r) => r.id === selectedResident.id)
    const nextIndex = (currentIndex + 1) % filteredResidents.length
    setSelectedResident(filteredResidents[nextIndex])
  }

  const handleFilterChange = (newFilter: "All" | "Low" | "Medium" | "High") => {
    setFilter(newFilter)
    const filteredList = newFilter === "All" ? allResidents : allResidents.filter((r) => r.pinkNoiseUsage === newFilter)
    setSelectedResident(filteredList[0])
  }

  const addNote = () => {
    if (note.trim()) {
      setSelectedResident({
        ...selectedResident,
        notes: [...selectedResident.notes, note.trim()],
      })
      setNote("")
    }
  }

  const updateStabilityGoal = () => {
    if (stabilityGoal !== selectedResident.stabilityGoal) {
      setSelectedResident((prevResident) => ({
        ...prevResident,
        stabilityGoal: stabilityGoal,
      }))
    }
  }

  const printReport = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Resident Report - ${selectedResident.name}</title>
          </head>
          <body>
            <h1>Resident Report - ${selectedResident.name}</h1>
            <p>Room: ${selectedResident.room}</p>
            <p>Current Stability Score: ${residentData[residentData.length - 1]?.stability?.toFixed(1) ?? "N/A"}</p>
            <p>Pink Noise Usage: ${selectedResident.pinkNoiseUsage}</p>
            <p>Stability Goal: ${selectedResident.stabilityGoal?.toFixed(1) ?? "N/A"}</p>
            <h2>Notes:</h2>
            <ul>
              ${selectedResident.notes.map((note) => `<li>${note}</li>`).join("")}
            </ul>
            <h2>Health Metrics:</h2>
            <ul>
              ${selectedResident.healthMetrics
                .map(
                  (metric) => `
                <li>${metric.name}: ${metric.value} ${metric.unit}</li>
              `,
                )
                .join("")}
            </ul>
            <h2>Pink Noise Recommendation:</h2>
            <p>${selectedResident.pinkNoiseRecommendation}</p>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const latestData = getLatestData(selectedResident)
  const currentStabilityScore = latestData.stability
  const currentPinkNoiseUsage = latestData.pinkNoiseUsage
  const initialStabilityScore = selectedResident.stabilityScore
  const initialPinkNoiseUsage = residentData[0]?.pinkNoiseUsage

  const stabilityScoreChange = calculatePercentageChange(initialStabilityScore, currentStabilityScore)
  const pinkNoiseUsageChange = calculatePercentageChange(initialPinkNoiseUsage, currentPinkNoiseUsage)

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-[calc(100vh-6rem)] overflow-hidden relative">
        {/* Fixed header */}
        <div className="bg-background sticky top-0 left-0 right-0 z-10 p-4 pr-12 border-b mt-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
            <h2 className="text-2xl font-bold truncate max-w-[calc(100%-6rem)]">
              {selectedResident.name} - Room {selectedResident.room}
            </h2>
            <div className="flex items-center space-x-2">
              <Select onValueChange={handleResidentChange} value={selectedResident.id.toString()}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a resident" />
                </SelectTrigger>
                <SelectContent>
                  {filteredResidents.map((resident) => (
                    <SelectItem key={resident.id} value={resident.id.toString()}>
                      {resident.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handlePreviousResident} variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={handleNextResident} variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-4 flex-wrap">
            <Button
              variant={filter === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("All")}
              className="text-xs px-2 py-1"
            >
              All
            </Button>
            <Button
              variant={filter === "Low" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("Low")}
              className="text-xs px-2 py-1"
            >
              Low
            </Button>
            <Button
              variant={filter === "Medium" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("Medium")}
              className="text-xs px-2 py-1"
            >
              Med
            </Button>
            <Button
              variant={filter === "High" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("High")}
              className="text-xs px-2 py-1"
            >
              High
            </Button>
            <Button onClick={printReport} variant="outline" size="sm" className="text-xs px-2 py-1">
              <Printer className="mr-1 h-3 w-3" />
              Print
            </Button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resident Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p>
                    <strong>Current Stability Score:</strong> {currentStabilityScore?.toFixed(1) ?? "N/A"}
                    <span className={`ml-2 ${Number(stabilityScoreChange) >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ({stabilityScoreChange}%)
                    </span>
                  </p>
                  <p>
                    <strong>Initial Stability Score:</strong> {initialStabilityScore?.toFixed(1) ?? "N/A"}
                  </p>
                  <p>
                    <strong>Current Pink Noise Usage:</strong> {currentPinkNoiseUsage?.toFixed(1) ?? "N/A"}%
                    <span className={`ml-2 ${Number(pinkNoiseUsageChange) >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ({pinkNoiseUsageChange}%)
                    </span>
                  </p>
                  <p>
                    <strong>Initial Pink Noise Usage:</strong> {initialPinkNoiseUsage?.toFixed(1) ?? "N/A"}%
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <strong>Stability Goal:</strong>
                    <Input
                      type="number"
                      value={stabilityGoal}
                      onChange={(e) => setStabilityGoal(Number.parseFloat(e.target.value))}
                      className="w-20"
                    />
                    <Button onClick={updateStabilityGoal} variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {selectedResident.healthMetrics.map((metric: HealthMetric) => (
                  <div key={metric.name}>
                    <p className="font-semibold">{metric.name}</p>
                    <p>
                      {metric.value} {metric.unit}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Stability and Pink Noise Usage Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[50vh] min-h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={residentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="day"
                    label={{ value: "Day", position: "insideBottomRight", offset: -10 }}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `Day ${value}`}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    yAxisId="left"
                    domain={[0, 10]}
                    label={{ value: "Stability Score", angle: -90, position: "insideLeft", offset: 10 }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
                    label={{ value: "Pink Noise Usage (%)", angle: 90, position: "insideRight", offset: 10 }}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip contentStyle={{ fontSize: "12px" }} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "12px" }} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="stability"
                    stroke="#8884d8"
                    name="Stability Score"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="pinkNoiseUsage"
                    stroke="#82ca9d"
                    name="Pink Noise Usage (%)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pink Noise Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{selectedResident.pinkNoiseRecommendation}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedResident.notes.map((note, index) => (
                  <p key={index}>{note}</p>
                ))}
              </div>
              <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Textarea
                  placeholder="Add a new note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={addNote} className="w-full sm:w-auto">
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  )
}

