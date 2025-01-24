export type Resident = {
  id: number
  name: string
  room: string
  stabilityScore: number
  pinkNoiseUsage: "Low" | "Medium" | "High"
  stabilityGoal: number
  notes: string[]
  healthMetrics: HealthMetric[]
  notifications: Notification[]
  pinkNoiseRecommendation: string
}

export type DailyData = {
  day: number
  stability: number
  pinkNoiseUsage: number
  fallDetected: boolean
}

export type HealthMetric = {
  name: string
  value: number
  unit: string
}

export type Notification = {
  id: string
  type: "alert" | "recommendation" | "goal"
  message: string
  timestamp: string
  read: boolean
}

