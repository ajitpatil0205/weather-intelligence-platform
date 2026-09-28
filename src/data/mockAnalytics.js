export const MOCK_ANALYTICS = {
  timeRanges: ["Today", "7 Days", "30 Days"],
  
  // 1. Weather Events Over Time (Line Chart)
  eventsOverTime: {
    "Today": [
      { time: "00:00", events: 12, verified: 10, alerts: 2 },
      { time: "03:00", events: 18, verified: 15, alerts: 3 },
      { time: "06:00", events: 34, verified: 28, alerts: 7 },
      { time: "09:00", events: 58, verified: 48, alerts: 14 },
      { time: "12:00", events: 45, verified: 37, alerts: 9 },
      { time: "15:00", events: 38, verified: 31, alerts: 8 },
      { time: "18:00", events: 29, verified: 24, alerts: 5 },
      { time: "21:00", events: 21, verified: 17, alerts: 3 }
    ],
    "7 Days": [
      { time: "Mon", events: 180, verified: 145, alerts: 28 },
      { time: "Tue", events: 210, verified: 172, alerts: 34 },
      { time: "Wed", events: 260, verified: 215, alerts: 45 },
      { time: "Thu", events: 248, verified: 186, alerts: 37 },
      { time: "Fri", events: 295, verified: 240, alerts: 52 },
      { time: "Sat", events: 230, verified: 188, alerts: 39 },
      { time: "Sun", events: 195, verified: 160, alerts: 30 }
    ],
    "30 Days": [
      { time: "Week 1", events: 1120, verified: 910, alerts: 178 },
      { time: "Week 2", events: 1450, verified: 1180, alerts: 235 },
      { time: "Week 3", events: 1890, verified: 1540, alerts: 310 },
      { time: "Week 4", events: 1680, verified: 1390, alerts: 275 }
    ]
  },

  // 2. Events By Category (Bar Chart)
  eventsByCategory: [
    { category: "Heavy Rain", count: 74, color: "#38bdf8" },
    { category: "Flooding", count: 48, color: "#ef4444" },
    { category: "Thunderstorm", count: 42, color: "#f59e0b" },
    { category: "Heatwave", count: 32, color: "#f97316" },
    { category: "Lightning", count: 28, color: "#eab308" },
    { category: "Strong Wind", count: 22, color: "#0284c7" },
    { category: "Fog", count: 18, color: "#94a3b8" },
    { category: "Dust Storm", count: 12, color: "#d97706" },
    { category: "Hailstorm", count: 9, color: "#818cf8" },
    { category: "Cyclone", count: 4, color: "#dc2626" }
  ],

  // 3. Severity Distribution (Donut Chart)
  severityDistribution: [
    { name: "HIGH Severity", value: 37, color: "#ef4444" },
    { name: "MEDIUM Severity", value: 128, color: "#f59e0b" },
    { name: "LOW Severity", value: 83, color: "#0284c7" }
  ],

  // 4. Verified vs Unverified (Pie Chart)
  verificationStatusDistribution: [
    { name: "Verified (Truth >= 80%)", value: 186, color: "#10b981" },
    { name: "Under Review (50-79%)", value: 44, color: "#f59e0b" },
    { name: "Unverified / Rejected (< 50%)", value: 18, color: "#64748b" }
  ],

  // 5. Events By State (Bar Chart)
  eventsByState: [
    { state: "Maharashtra", count: 46, highSeverity: 14 },
    { state: "Tamil Nadu", count: 38, highSeverity: 10 },
    { state: "Karnataka", count: 32, highSeverity: 7 },
    { state: "West Bengal", count: 28, highSeverity: 6 },
    { state: "Gujarat", count: 24, highSeverity: 8 },
    { state: "Assam", count: 22, highSeverity: 9 },
    { state: "Uttar Pradesh", count: 20, highSeverity: 5 },
    { state: "Kerala", count: 19, highSeverity: 6 },
    { state: "Bihar", count: 16, highSeverity: 4 },
    { state: "Odisha", count: 15, highSeverity: 4 }
  ],

  // 6. Source Distribution & Reliability
  sourceDistribution: [
    { source: "IMD Doppler", count: 84, reliability: 100 },
    { source: "IoT Stations", count: 68, reliability: 90 },
    { source: "Weather APIs", count: 52, reliability: 95 },
    { source: "Govt / SDMA", count: 40, reliability: 95 },
    { source: "Citizen App", count: 35, reliability: 70 },
    { source: "Social Media", count: 22, reliability: 45 }
  ],

  // 7. Truth Score Distribution (Histogram)
  truthScoreBuckets: [
    { range: "0 - 49%", count: 18, label: "Unverified" },
    { range: "50 - 64%", count: 20, label: "Low Confidence" },
    { range: "65 - 79%", count: 24, label: "Moderate Review" },
    { range: "80 - 89%", count: 88, label: "High Confidence" },
    { range: "90 - 100%", count: 98, label: "Fully Verified" }
  ],

  // 8. Hourly Event Activity Peak
  hourlyActivity: [
    { hour: "00h", reports: 8, alerts: 1 },
    { hour: "02h", reports: 6, alerts: 1 },
    { hour: "04h", reports: 11, alerts: 2 },
    { hour: "06h", reports: 26, alerts: 5 },
    { hour: "08h", reports: 54, alerts: 11 },
    { hour: "10h", reports: 68, alerts: 16 },
    { hour: "12h", reports: 49, alerts: 9 },
    { hour: "14h", reports: 42, alerts: 7 },
    { hour: "16h", reports: 58, alerts: 12 },
    { hour: "18h", reports: 62, alerts: 13 },
    { hour: "20h", reports: 37, alerts: 6 },
    { hour: "22h", reports: 19, alerts: 3 }
  ]
};
