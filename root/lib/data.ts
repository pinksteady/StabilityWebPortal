import type { Resident } from "./types"
import type { DailyData } from "./types"
import { addDays, subDays } from "date-fns"
import type { HealthMetric, Notification, FallData } from "./types"

export type HealthMetric = {
  name: string
  value: number
  unit: string
  trend: "increasing" | "decreasing" | "stable"
}

export type Notification = {
  id: string
  type: "alert" | "recommendation" | "goal"
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
}

export type FallData = {
  occurred: boolean
  severity: "minor" | "moderate" | "severe" | null
  location: string | null
  timeOfDay: "morning" | "afternoon" | "evening" | "night" | null
}

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
  personalizedGoal: {
    current: number
    target: number
    achieveBy: string
  }
  lastAssessment: string
}

export type DailyData = {
  day: number
  date: string
  stability: number
  pinkNoiseUsage: number
  fallData: FallData
  healthMetrics: HealthMetric[]
}

export const allResidents: Resident[] = [
  {
    id: 1,
    name: "Alice Johnson",
    room: "201",
    stabilityScore: 5.8,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 6.5,
    notes: ["Showing good progress with pink noise usage", "Reported feeling more stable during morning walks"],
    healthMetrics: [
      { name: "Blood Pressure", value: 120, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 72, unit: "bpm", trend: "decreasing" },
      { name: "Sleep Quality", value: 8, unit: "hours", trend: "increasing" },
    ],
    notifications: [
      {
        id: "1",
        type: "recommendation",
        message: "Consider increasing pink noise usage during afternoon naps",
        timestamp: "2023-05-15T14:30:00Z",
        read: false,
        priority: "medium",
      },
    ],
    pinkNoiseRecommendation: "Increase usage during afternoon naps to improve overall stability",
    personalizedGoal: {
      current: 7.8,
      target: 8.5,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 2,
    name: "Bob Smith",
    room: "105",
    stabilityScore: 4.5,
    pinkNoiseUsage: "Low",
    stabilityGoal: 5.5,
    notes: ["Needs encouragement to increase pink noise usage", "Prefers lower volume settings"],
    healthMetrics: [
      { name: "Blood Pressure", value: 130, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 68, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 6, unit: "hours", trend: "stable" },
    ],
    notifications: [
      {
        id: "2",
        type: "alert",
        message: "Stability score dropped below goal",
        timestamp: "2023-05-14T09:15:00Z",
        read: true,
        priority: "high",
      },
    ],
    pinkNoiseRecommendation: "Try using pink noise for 30 minutes before bedtime to improve sleep quality",
    personalizedGoal: {
      current: 6.5,
      target: 7.0,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 3,
    name: "Carol Davis",
    room: "312",
    stabilityScore: 7.2,
    pinkNoiseUsage: "High",
    stabilityGoal: 7.5,
    notes: ["Consistently using pink noise", "Reports improved balance during daily activities"],
    healthMetrics: [
      { name: "Blood Pressure", value: 118, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 70, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 7.5, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Maintain current usage pattern and monitor for any changes",
    personalizedGoal: {
      current: 8.2,
      target: 8.5,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 4,
    name: "David Brown",
    room: "118",
    stabilityScore: 3.9,
    pinkNoiseUsage: "Low",
    stabilityGoal: 5.0,
    notes: ["Reluctant to use pink noise", "Experiencing frequent dizzy spells"],
    healthMetrics: [
      { name: "Blood Pressure", value: 140, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 75, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 5, unit: "hours", trend: "stable" },
    ],
    notifications: [
      {
        id: "3",
        type: "alert",
        message: "Low pink noise usage detected",
        timestamp: "2023-05-16T10:00:00Z",
        read: false,
        priority: "high",
      },
    ],
    pinkNoiseRecommendation: "Gradually introduce pink noise during rest periods to improve acceptance",
    personalizedGoal: {
      current: 5.9,
      target: 7.0,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 5,
    name: "Emma Wilson",
    room: "203",
    stabilityScore: 7.1,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 7.5,
    notes: ["Showing interest in increasing pink noise usage", "Reported improved sleep quality"],
    healthMetrics: [
      { name: "Blood Pressure", value: 125, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 68, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 7, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Consider increasing pink noise usage duration to reach stability goal",
    personalizedGoal: {
      current: 7.1,
      target: 7.5,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 6,
    name: "Frank Thomas",
    room: "115",
    stabilityScore: 6.8,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 7.5,
    notes: ["Responds well to pink noise during the day", "Needs reminders for evening usage"],
    healthMetrics: [
      { name: "Blood Pressure", value: 128, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 70, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 6.5, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Increase evening pink noise usage to improve overall stability",
    personalizedGoal: {
      current: 6.8,
      target: 7.5,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 7,
    name: "Grace Lee",
    room: "220",
    stabilityScore: 7.5,
    pinkNoiseUsage: "High",
    stabilityGoal: 8.0,
    notes: ["Enthusiastic about pink noise therapy", "Reports improved focus during daily activities"],
    healthMetrics: [
      { name: "Blood Pressure", value: 122, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 65, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 7.8, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Continue current usage pattern and consider slight increase to reach goal",
    personalizedGoal: {
      current: 7.5,
      target: 8.0,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 8,
    name: "Henry Garcia",
    room: "308",
    stabilityScore: 6.2,
    pinkNoiseUsage: "Low",
    stabilityGoal: 7.0,
    notes: ["Skeptical about pink noise benefits", "Prefers alternative relaxation methods"],
    healthMetrics: [
      { name: "Blood Pressure", value: 135, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 72, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 5.5, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Introduce pink noise gradually, starting with short sessions during preferred activities",
    personalizedGoal: {
      current: 6.2,
      target: 7.0,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 9,
    name: "Isabel Martinez",
    room: "112",
    stabilityScore: 7.9,
    pinkNoiseUsage: "High",
    stabilityGoal: 8.5,
    notes: ["Consistent pink noise user", "Reports significant improvement in balance"],
    healthMetrics: [
      { name: "Blood Pressure", value: 118, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 68, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 8, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Maintain current usage and monitor for any changes in effectiveness",
    personalizedGoal: {
      current: 7.9,
      target: 8.5,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 10,
    name: "Jack Wilson",
    room: "205",
    stabilityScore: 6.7,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 7.5,
    notes: ["Interested in pink noise therapy", "Needs assistance with device operation"],
    healthMetrics: [
      { name: "Blood Pressure", value: 130, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 70, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 6.8, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Provide additional support for device usage and encourage consistent application",
    personalizedGoal: {
      current: 6.7,
      target: 7.5,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 11,
    name: "Karen Brown",
    room: "317",
    stabilityScore: 7.3,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 8.0,
    notes: ["Enjoys pink noise during reading time", "Requests more information on benefits"],
    healthMetrics: [
      { name: "Blood Pressure", value: 125, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 69, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 7.2, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Increase usage during other daily activities to maximize benefits",
    personalizedGoal: {
      current: 7.3,
      target: 8.0,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 12,
    name: "Liam Johnson",
    room: "110",
    stabilityScore: 6.0,
    pinkNoiseUsage: "Low",
    stabilityGoal: 7.0,
    notes: ["New to pink noise therapy", "Expresses interest but needs guidance"],
    healthMetrics: [
      { name: "Blood Pressure", value: 132, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 74, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 5.8, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Start with short, regular sessions and gradually increase duration",
    personalizedGoal: {
      current: 6.0,
      target: 7.0,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 13,
    name: "Mia Taylor",
    room: "222",
    stabilityScore: 8.0,
    pinkNoiseUsage: "High",
    stabilityGoal: 8.5,
    notes: ["Advocates for pink noise among other residents", "Reports improved cognitive function"],
    healthMetrics: [
      { name: "Blood Pressure", value: 120, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 66, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 8.2, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Continue current regimen and consider participating in peer support activities",
    personalizedGoal: {
      current: 8.0,
      target: 8.5,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 14,
    name: "Noah Anderson",
    room: "305",
    stabilityScore: 7.2,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 7.8,
    notes: ["Uses pink noise primarily for sleep", "Interested in daytime applications"],
    healthMetrics: [
      { name: "Blood Pressure", value: 128, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 71, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 7.5, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Introduce pink noise during daytime rest periods to enhance overall stability",
    personalizedGoal: {
      current: 7.2,
      target: 7.8,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 15,
    name: "Olivia White",
    room: "119",
    stabilityScore: 6.9,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 7.5,
    notes: ["Combines pink noise with other relaxation techniques", "Reports mixed results"],
    healthMetrics: [
      { name: "Blood Pressure", value: 126, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 69, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 7, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Adjust pink noise usage to complement other techniques for optimal results",
    personalizedGoal: {
      current: 6.9,
      target: 7.5,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 16,
    name: "Peter Harris",
    room: "210",
    stabilityScore: 7.7,
    pinkNoiseUsage: "High",
    stabilityGoal: 8.2,
    notes: ["Consistent user of pink noise", "Interested in latest research findings"],
    healthMetrics: [
      { name: "Blood Pressure", value: 122, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 67, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 7.8, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Maintain current usage and provide updates on new research developments",
    personalizedGoal: {
      current: 7.7,
      target: 8.2,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 17,
    name: "Quinn Foster",
    room: "320",
    stabilityScore: 6.3,
    pinkNoiseUsage: "Low",
    stabilityGoal: 7.0,
    notes: ["Prefers nature sounds over pink noise", "Willing to try new approaches"],
    healthMetrics: [
      { name: "Blood Pressure", value: 130, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 73, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 6, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Explore combining pink noise with nature sounds to increase acceptance and usage",
    personalizedGoal: {
      current: 6.3,
      target: 7.0,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 18,
    name: "Rachel Green",
    room: "108",
    stabilityScore: 7.4,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 8.0,
    notes: ["Uses pink noise during physical therapy sessions", "Reports improved focus"],
    healthMetrics: [
      { name: "Blood Pressure", value: 124, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 70, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 7.3, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Increase usage during other daily activities to enhance overall stability",
    personalizedGoal: {
      current: 7.4,
      target: 8.0,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 19,
    name: "Samuel Clark",
    room: "225",
    stabilityScore: 6.6,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 7.2,
    notes: ["Recently started using pink noise", "Reports some improvement in sleep quality"],
    healthMetrics: [
      { name: "Blood Pressure", value: 128, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 72, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 6.5, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Gradually increase usage duration to maximize benefits",
    personalizedGoal: {
      current: 6.6,
      target: 7.2,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 20,
    name: "Tina Rodriguez",
    room: "314",
    stabilityScore: 7.6,
    pinkNoiseUsage: "High",
    stabilityGoal: 8.0,
    notes: ["Enthusiastic about pink noise therapy", "Uses it throughout the day"],
    healthMetrics: [
      { name: "Blood Pressure", value: 120, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 68, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 7.7, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Continue current usage pattern and monitor for any plateau in benefits",
    personalizedGoal: {
      current: 7.6,
      target: 8.0,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 21,
    name: "Ulysses King",
    room: "106",
    stabilityScore: 6.1,
    pinkNoiseUsage: "Low",
    stabilityGoal: 7.0,
    notes: ["Skeptical about pink noise benefits", "Prefers classical music"],
    healthMetrics: [
      { name: "Blood Pressure", value: 134, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 74, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 5.5, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Introduce pink noise gradually, possibly mixed with classical music",
    personalizedGoal: {
      current: 6.1,
      target: 7.0,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 22,
    name: "Violet Chang",
    room: "218",
    stabilityScore: 7.8,
    pinkNoiseUsage: "High",
    stabilityGoal: 8.3,
    notes: ["Uses pink noise during meditation", "Reports improved balance"],
    healthMetrics: [
      { name: "Blood Pressure", value: 118, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 65, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 8, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Maintain current usage and consider incorporating into other daily activities",
    personalizedGoal: {
      current: 7.8,
      target: 8.3,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 23,
    name: "William Turner",
    room: "302",
    stabilityScore: 6.7,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 7.3,
    notes: ["Uses pink noise intermittently", "Interested in learning more about optimal usage"],
    healthMetrics: [
      { name: "Blood Pressure", value: 126, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 71, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 6.8, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Establish a more consistent usage pattern and provide education on benefits",
    personalizedGoal: {
      current: 6.7,
      target: 7.3,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
  {
    id: 24,
    name: "Xena Lawson",
    room: "114",
    stabilityScore: 7.0,
    pinkNoiseUsage: "Medium",
    stabilityGoal: 7.6,
    notes: ["Recently increased pink noise usage", "Reports feeling more energetic"],
    healthMetrics: [
      { name: "Blood Pressure", value: 124, unit: "mmHg", trend: "stable" },
      { name: "Heart Rate", value: 69, unit: "bpm", trend: "stable" },
      { name: "Sleep Quality", value: 7.2, unit: "hours", trend: "stable" },
    ],
    notifications: [],
    pinkNoiseRecommendation: "Continue increasing usage gradually and monitor improvements in stability",
    personalizedGoal: {
      current: 7.0,
      target: 7.6,
      achieveBy: "2023-08-15",
    },
    lastAssessment: "2023-05-01",
  },
]

export function generateResidentData(resident: Resident, timeRange: number): DailyData[] {
  const data: DailyData[] = []
  let baseStability = resident.stabilityScore
  let basePinkNoiseUsage = resident.pinkNoiseUsage === "High" ? 80 : resident.pinkNoiseUsage === "Medium" ? 50 : 20

  const startDate = subDays(new Date(), timeRange - 1)

  for (let i = 0; i < timeRange; i++) {
    const currentDate = addDays(startDate, i)
    const stabilityVariability = (Math.random() - 0.5) * 0.6 // Increased variability
    const stabilityTrend = 0.002 * i // Reduced trend
    let stability = Math.max(0, Math.min(10, baseStability + stabilityVariability + stabilityTrend))

    const pinkNoiseVariability = (Math.random() - 0.5) * 30 // Increased variability
    let pinkNoiseUsage = Math.max(0, Math.min(100, basePinkNoiseUsage + pinkNoiseVariability))

    if (i > 0) {
      const previousStability = data[i - 1].stability
      const pinkNoiseEffect = (pinkNoiseUsage - 50) / 400 // Reduced effect
      stability = Math.max(0, Math.min(10, stability + pinkNoiseEffect))
    }

    if (Math.random() < 0.08) {
      // Increased chance of significant events
      stability += (Math.random() - 0.5) * 3 // Larger stability changes
      pinkNoiseUsage += (Math.random() - 0.5) * 50 // Larger usage changes
    }

    stability = Math.max(0, Math.min(10, stability))
    pinkNoiseUsage = Math.max(0, Math.min(100, pinkNoiseUsage))

    const fallOccurred = Math.random() < 0.07 // Increased fall probability
    const fallData: FallData = fallOccurred
      ? {
          occurred: true,
          severity: ["minor", "moderate", "severe"][Math.floor(Math.random() * 3)] as "minor" | "moderate" | "severe",
          location: ["bedroom", "bathroom", "living room", "hallway"][Math.floor(Math.random() * 4)],
          timeOfDay: ["morning", "afternoon", "evening", "night"][Math.floor(Math.random() * 4)] as
            | "morning"
            | "afternoon"
            | "evening"
            | "night",
        }
      : {
          occurred: false,
          severity: null,
          location: null,
          timeOfDay: null,
        }

    data.push({
      day: i + 1,
      date: currentDate.toISOString(),
      stability: stability,
      pinkNoiseUsage: pinkNoiseUsage,
      fallData: fallData,
      healthMetrics: resident.healthMetrics.map((metric) => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 5,
      })),
    })

    baseStability = stability
    basePinkNoiseUsage = pinkNoiseUsage
  }

  return data
}

export function getFallIncidents(residentData: DailyData[]): number {
  return residentData.filter((day) => day.fallData.occurred).length
}

export function getDetailedFallInfo(residentData: DailyData[]): FallData[] {
  return residentData
    .filter((day) => day.fallData.occurred)
    .map((day) => ({
      ...day.fallData,
      date: day.date,
      stability: day.stability,
      pinkNoiseUsage: day.pinkNoiseUsage,
    }))
}

export function getResidentDistribution() {
  const distribution = { Low: 0, Medium: 0, High: 0 }
  allResidents.forEach((resident) => {
    if (resident.stabilityScore < 5) {
      distribution.Low++
    } else if (resident.stabilityScore < 7) {
      distribution.Medium++
    } else {
      distribution.High++
    }
  })
  return distribution
}

export function generateNotification(resident: Resident): Notification {
  const types: Notification["type"][] = ["alert", "recommendation", "goal"]
  const randomType = types[Math.floor(Math.random() * types.length)]
  const priorities: Notification["priority"][] = ["low", "medium", "high"]
  const randomPriority = priorities[Math.floor(Math.random() * priorities.length)]

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: randomType,
    message: `New ${randomType} for ${resident.name}`,
    timestamp: new Date().toISOString(),
    read: false,
    priority: randomPriority,
  }
}

export function generatePersonalizedRecommendation(resident: Resident): string {
  const stabilityDiff = resident.personalizedGoal.target - resident.personalizedGoal.current
  const daysUntilGoal = Math.ceil(
    (new Date(resident.personalizedGoal.achieveBy).getTime() - new Date().getTime()) / (1000 * 3600 * 24),
  )

  if (stabilityDiff > 0) {
    return `Increase pink noise usage by ${Math.ceil(stabilityDiff * 20)}% to achieve your stability goal of ${resident.personalizedGoal.target} by ${resident.personalizedGoal.achieveBy}. You have ${daysUntilGoal} days left.`
  } else {
    return `Maintain your current pink noise usage to sustain your excellent stability score. Your next assessment is due in ${daysUntilGoal} days.`
  }
}

export function getLatestData(resident: Resident): DailyData {
  const data = generateResidentData(resident, 30)
  return data[data.length - 1]
}

export { allResidents }
export type { Resident, DailyData, FallData }

