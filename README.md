# 🌦️ AI-Powered National Weather Intelligence & Proactive Alert Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-GIS_Mapping-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![SIH](https://img.shields.io/badge/Smart_India_Hackathon-National_Prototype-FF9933)](https://sih.gov.in/)

> A command-center web application that collects, cross-verifies, deduplicates, and analyzes real-time weather information across India from multiple internet-based sources (IMD Doppler radars, IoT weather stations, social media #IMD feeds, satellite feeds, and citizen crowdsourced reports) to broadcast proactive, life-saving alerts.

---

## 🌟 Key Capabilities & Modules

1. **🏛️ Command Center Dashboard**:
   - 6 live national intelligence KPI cards (*Total Events, Verified Events, Critical Threats, Active Alerts, Average Truth Score, Data Sources*).
   - Interactive India Situation Map with pulsing radar markers (Red = High, Orange = Medium, Blue = Low).
   - Real-time proactive alerts feed with one-click acknowledgement.

2. **🗺️ Interactive GIS Weather Situation Map**:
   - Full-screen India GIS map with quick regional zoom presets (*North, South, East, West, Central, Northeast*).
   - Multi-filtering by **10 Event Types** (*Flooding, Heavy Rainfall, Thunderstorm, Heatwave, Fog, Dust Storm, Strong Wind, Cyclone, Hailstorm, Lightning*), **Severity**, and **Verification Status**.
   - **Simulated Spatiotemporal Heatmap**: Circular intensity overlay representing incident concentration.
   - **Multi-Basemap & API Key Manager**: Esri World Dark Gray (watermark-free default), OpenStreetMap, High-Res Satellite, and custom Mapbox/MapTiler/OpenWeatherMap radar overlay support.

3. **📋 Weather Event Management Registry**:
   - 30+ comprehensive Indian weather event records with sorting, search, filtering, and pagination.
   - Click-to-inspect deep-dive dossiers.

4. **🔬 Event Dossier & AI Truth Score Breakdown**:
   - Circular animated **Weather Truth Score Gauge** ($\ge 80$ Verified, $50-79$ Review, $<50$ Unverified).
   - 4-Factor multi-sensor verification breakdown:
     - **Source Reliability Weight ($35\%$)**
     - **NLP Content & Context Confidence ($20\%$)**
     - **Spatial & Geospatial Consistency ($25\%$)**
     - **Cross-Source Multi-Sensor Agreement ($20\%$)**
   - Automated Public & Authority Action SOP Directives.

5. **⚙️ AI Verification Center & Live Truth Score Sandbox**:
   - **8-Stage Ingestion Pipeline**: Ingest $\rightarrow$ Source Check $\rightarrow$ NLP Analysis $\rightarrow$ Geo Boundary $\rightarrow$ Deduplication $\rightarrow$ Cross-Source $\rightarrow$ Truth Score $\rightarrow$ Alert SOP.
   - **Interactive Simulator**: Sliders to test how source credibility and cross-sensor agreement dynamically adjust the Truth Score.

6. **🔍 Duplicate Report Detection & Spatiotemporal Clustering**:
   - Automatically clusters concurrent citizen tweets, IoT sensor alarms, and municipal reports within $\le 2.5\text{ km}$ and a 15-minute rolling window into 1 canonical event.
   - Interactive NLP similarity tester to benchmark text and distance metrics.

7. **🚨 Proactive Alert Engine & Dispatch Simulator**:
   - Priority-tiered alert cards with affected area radius, target population, and emergency directives.
   - **Alert History** log & **Interactive Alert Generator** to simulate new CAP broadcast notifications.

8. **📊 Analytics & Historical Intelligence (Recharts)**:
   - 8 dynamic visualizations: Time-series trends, classification distribution, severity donut, verification pie, state ranking, source reliability, score histogram, and hourly diurnal peaks.
   - Date range selector: *Today*, *7 Days*, *30 Days*.

9. **🛡️ Admin Panel & #IMD Social Big Data Harvester**:
   - Live stream tracking `#IMD`, `#MumbaiRains`, `#DelhiFog`, `#CycloneAlert`, `#PuneFloods`, `#BangaloreRains`, `#HeatwaveWarning`, `#MonsoonUpdate`.
   - **AI Fake News & Recycled Media Detector**: Identifies outdated/reused disaster videos via reverse perceptual hashing.
   - 4-Way Multi-Dimensional Filtering (**Date-wise, Event-wise, Location-wise, Verification Status**).
   - Database telemetry schema JSON inspector and CSV export.

10. **📡 Source Health & Ingestion Telemetry**:
    - Live health cards for 8 meteorological sources (*IMD Doppler, ECMWF/OpenWeather APIs, State Disaster Management Authorities, Citizen App, Social Media NLP, IoT AWS Grid, ISRO INSAT-3DR Satellite, and Central Water Commission*).

---

## 🧮 Mathematical Truth Scoring Formula

$$\text{Truth Score} = (0.35 \times S) + (0.20 \times C) + (0.25 \times L) + (0.20 \times A)$$

- **$S$ (Source Reliability - 35%)**: IMD (100%), IoT AWS (90%), Citizen App (70%), Social Media (45%).
- **$C$ (Content Confidence - 20%)**: NLP Transformer semantic confidence score and media authenticity.
- **$L$ (Location Consistency - 25%)**: Device GPS validation against historical flood-vulnerability zones.
- **$A$ (Cross-Source Agreement - 20%)**: Multi-sensor corroboration within a 15-minute time window.

---

## 🏗️ Proposed Production Big Data Architecture

```
[MULTIPLE WEATHER SOURCES] 
 (IMD Radar, IoT AWS, Satellite, SDMA, Social #IMD, Citizen Mobile)
          ↓
[DATA INGESTION PIPELINE] (Apache Kafka / 50k+ msgs/sec)
          ↓
[DATA CLEANING & NORMALIZATION] (Apache Spark / PySpark)
          ↓
[METEOROLOGICAL EVENT DETECTION] (ML Hazard Classifier)
          ↓
[DUPLICATE DETECTION & CLUSTERING] (PostGIS Spatial Index + NLP)
          ↓
[CROSS-SOURCE MULTI-SENSOR VERIFICATION] (Consensus Matrix)
          ↓
[WEATHER TRUTH SCORE CALCULATION] (Bayesian Consensus Model)
          ↓
[SEVERITY ASSESSMENT] (Spatial Hazard Matrix)
          ↓
[PROACTIVE ALERT ENGINE] (Common Alerting Protocol - CAP)
          ↓
[DASHBOARD + CITIZEN ALERTS] (React 18 GIS + WebSockets)
```

---

## 💻 Tech Stack

- **Frontend Core**: React 18, Vite 8, JavaScript (ESNext)
- **Styling**: Tailwind CSS v4, Custom Command-Center Theme
- **GIS & Mapping**: Leaflet, React-Leaflet, Esri Dark Gray Base & OpenStreetMap
- **Data Visualizations**: Recharts (Area, Bar, Pie, Donut, Histograms)
- **Icons**: Lucide React
- **Architecture Stack (Proposed Production)**: Python FastAPI, PostgreSQL + PostGIS, Apache Kafka, Apache Spark ML

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/weather-intelligence-platform.git

# 2. Navigate into directory
cd weather-intelligence-platform

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open **`http://localhost:5173`** in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📝 Disclaimer
> **DEMO MODE**: This application is a self-contained frontend prototype created for demonstration and Smart India Hackathon evaluation. Weather events and telemetry are simulated.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
