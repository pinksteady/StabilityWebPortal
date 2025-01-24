// ... (previous imports and code)

export function generateResidentData(resident: Resident, timeRange: number): DailyData[] {
  const data: DailyData[] = []
  let baseStability = resident.stabilityScore
  let basePinkNoiseUsage = resident.pinkNoiseUsage === "High" ? 80 : resident.pinkNoiseUsage === "Medium" ? 50 : 20

  for (let i = 1; i <= timeRange; i++) {
    // Add variability to stability score
    const stabilityVariability = (Math.random() - 0.5) * 0.4 // +/- 0.2 max variability

    // Introduce a more subtle upward trend (0.003 per day)
    const stabilityTrend = 0.003 * i

    let stability = Math.max(0, Math.min(10, baseStability + stabilityVariability + stabilityTrend))

    // Add variability to pink noise usage
    const pinkNoiseVariability = (Math.random() - 0.5) * 20 // +/- 10% max variability
    let pinkNoiseUsage = Math.max(0, Math.min(100, basePinkNoiseUsage + pinkNoiseVariability))

    // Gradual trend based on pink noise usage
    if (i > 1) {
      const previousStability = data[i - 2].stability
      const pinkNoiseEffect = (pinkNoiseUsage - 50) / 500 // Slight positive effect for high usage, negative for low
      stability = Math.max(0, Math.min(10, stability + pinkNoiseEffect))
    }

    // Occasional significant events
    if (Math.random() < 0.05) {
      // 5% chance of a significant event
      stability += (Math.random() - 0.5) * 2 // +/- 1 max change
      pinkNoiseUsage += (Math.random() - 0.5) * 40 // +/- 20% max change
    }

    // Ensure values are within bounds
    stability = Math.max(0, Math.min(10, stability))
    pinkNoiseUsage = Math.max(0, Math.min(100, pinkNoiseUsage))

    data.push({
      day: i,
      stability: stability,
      pinkNoiseUsage: pinkNoiseUsage,
      fallDetected: Math.random() < 0.05, // 5% chance of fall detection
    })

    // Update base values for next iteration
    baseStability = stability
    basePinkNoiseUsage = pinkNoiseUsage
  }

  return data
}

// ... (rest of the file remains the same)

