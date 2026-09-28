export const MOCK_DUPLICATE_CLUSTERS = [
  {
    clusterId: "DUP-CLU-101",
    targetEvent: "Flooding in Pune (Shivajinagar & Sinhagad Rd)",
    canonicalEventId: "EVT-1001",
    location: "Pune, Maharashtra",
    coordinates: [18.5204, 73.8567],
    eventType: "Flooding",
    totalReportsMerged: 4,
    similarityScore: 88,
    maxDistanceKm: 0.8,
    resultVerdict: "LIKELY DUPLICATE — MERGED INTO EVT-1001",
    deduplicationRationale: "Reports are grouped as potentially describing the same underlying event; the individual source records remain available.",
    reports: [
      {
        reportId: "REP-9101",
        source: "Citizen Mobile App",
        author: "Citizen #4812",
        text: "Heavy rainfall causing waterlogging in Pune Sinhagad Road underpass, water level over 3 feet.",
        timestamp: "10:32 AM",
        geoOffset: "0.0 km",
        reliability: 72,
        similarityToPrimary: 100
      },
      {
        reportId: "REP-9102",
        source: "Social Media (Twitter/X NLP)",
        author: "@PuneTrafficPulse",
        text: "Pune experiencing flooding after heavy rain near Shivajinagar bridge and Sinhagad Rd. Traffic stalled.",
        timestamp: "10:30 AM",
        geoOffset: "0.8 km",
        reliability: 48,
        similarityToPrimary: 84
      },
      {
        reportId: "REP-9103",
        source: "IMD Doppler Radar Alert",
        author: "IMD Mumbai Radar Node",
        text: "Convective cell generating 45mm/hr precipitation over Haveli and Pune Urban Tehsil.",
        timestamp: "10:28 AM",
        geoOffset: "0.3 km",
        reliability: 98,
        similarityToPrimary: 79
      },
      {
        reportId: "REP-9104",
        source: "Pune Smart City IoT Drain Sensor",
        author: "PMC Sensor #D-041",
        text: "Culvert capacity threshold exceeded (92% flow saturation) at Mutha Basin Outfall 4.",
        timestamp: "10:25 AM",
        geoOffset: "0.5 km",
        reliability: 95,
        similarityToPrimary: 76
      }
    ]
  },
  {
    clusterId: "DUP-CLU-102",
    targetEvent: "Severe Waterlogging on Bengaluru Outer Ring Road",
    canonicalEventId: "EVT-1006",
    location: "Bengaluru, Karnataka",
    coordinates: [12.9716, 77.5946],
    eventType: "Heavy Rainfall",
    totalReportsMerged: 3,
    similarityScore: 84,
    maxDistanceKm: 1.2,
    resultVerdict: "LIKELY DUPLICATE — MERGED INTO EVT-1006",
    deduplicationRationale: "NLP entity extraction matched key location 'Outer Ring Road Ecospace' across citizen posts and traffic cameras.",
    reports: [
      {
        reportId: "REP-8401",
        source: "Citizen Crowdsource App",
        author: "Citizen #9021",
        text: "Bellandur Ecospace stretch flooded after 1 hr downpour, buses stranded.",
        timestamp: "08:55 AM",
        geoOffset: "0.0 km",
        reliability: 70,
        similarityToPrimary: 100
      },
      {
        reportId: "REP-8402",
        source: "Social Media NLP",
        author: "@BLRTrafficWatch",
        text: "Waterlogged ORR near Bellandur lake bridge. Slow traffic movement toward Marathahalli.",
        timestamp: "08:52 AM",
        geoOffset: "0.9 km",
        reliability: 52,
        similarityToPrimary: 86
      },
      {
        reportId: "REP-8403",
        source: "BBMP Smart City Sensor",
        author: "BBMP Node #W-12",
        text: "Surface water depth sensor triggered (18cm inundation) on ORR Sector 5.",
        timestamp: "08:48 AM",
        geoOffset: "1.2 km",
        reliability: 92,
        similarityToPrimary: 81
      }
    ]
  },
  {
    clusterId: "DUP-CLU-103",
    targetEvent: "Dense Fog Reduction at IGI Airport Delhi",
    canonicalEventId: "EVT-1003",
    location: "Delhi, Delhi NCR",
    coordinates: [28.6139, 77.2090],
    eventType: "Fog",
    totalReportsMerged: 3,
    similarityScore: 91,
    maxDistanceKm: 2.1,
    resultVerdict: "LIKELY DUPLICATE — MERGED INTO EVT-1003",
    deduplicationRationale: "Temporal overlap (15-min window) and spatial containment within Delhi IGI catchment.",
    reports: [
      {
        reportId: "REP-7711",
        source: "Government METAR Sensor",
        author: "IGIA Automated Met Station",
        text: "METAR VIDP 280425Z RVR 125m Fog CAT III operational.",
        timestamp: "09:55 AM",
        geoOffset: "0.0 km",
        reliability: 99,
        similarityToPrimary: 100
      },
      {
        reportId: "REP-7712",
        source: "Citizen Report",
        author: "Traveler #3312",
        text: "Zero visibility at Delhi Airport Terminal 3, flights grounded.",
        timestamp: "09:50 AM",
        geoOffset: "1.1 km",
        reliability: 68,
        similarityToPrimary: 89
      },
      {
        reportId: "REP-7713",
        source: "Social Media Feed",
        author: "@AviationTrackerIndia",
        text: "Dense winter fog envelops Delhi IGI runway, delays across domestic departures.",
        timestamp: "09:47 AM",
        geoOffset: "2.1 km",
        reliability: 55,
        similarityToPrimary: 82
      }
    ]
  }
];
