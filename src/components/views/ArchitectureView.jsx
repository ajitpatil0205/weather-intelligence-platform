import React from 'react';
import { 
  Network, 
  ArrowDown, 
  Cpu, 
  Database, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  BellRing, 
  Server, 
  Code2, 
  CheckCircle2, 
  Terminal
} from 'lucide-react';

export const ArchitectureView = () => {
  const pipelineSteps = [
    {
      num: "01",
      title: "MULTIPLE WEATHER SOURCES",
      tech: "IMD GTS, OpenWeather API, SDMA WFS, Citizen Mobile SDK, Twitter/X NLP Stream, AWS IoT Nodes",
      desc: "Ingests structured Doppler reflectivity grids, METAR forecasts, river gauges, crowdsourced smartphone uploads, and unstructured disaster microblogs."
    },
    {
      num: "02",
      title: "DATA INGESTION PIPELINE",
      tech: "Apache Kafka Streaming / REST Webhooks",
      desc: "Distributed event streaming bus handling high-throughput telemetry streams (50k+ events/sec) with zero data loss and fault-tolerant partitions."
    },
    {
      num: "03",
      title: "DATA CLEANING & NORMALIZATION",
      tech: "Apache Spark / PySpark Sanitization",
      desc: "Schema harmonization, timestamp alignment (UTC to IST), unit conversions (inches/mm, knots/kmh), spam filtering, and image OCR validation."
    },
    {
      num: "04",
      title: "METEOROLOGICAL EVENT DETECTION",
      tech: "ML Hazard Classifier & Anomaly Detector",
      desc: "Applies physics-guided machine learning and threshold models (IMD classification standards) to isolate genuine severe weather events from background noise."
    },
    {
      num: "05",
      title: "DUPLICATE DETECTION & CLUSTERING",
      tech: "PostGIS Spatial Index + HuggingFace Transformer NLP",
      desc: "Computes cosine text similarity and geospatial distance radius (&le; 2.5km) in a 15-minute rolling window to merge redundant reports into canonical events."
    },
    {
      num: "06",
      title: "CROSS-SOURCE VERIFICATION",
      tech: "Multi-Sensor Consensus Correlation Engine",
      desc: "Cross-checks citizen claims against Doppler radar reflectivity, satellite infrared cloud tops, and nearby municipal rain gauges."
    },
    {
      num: "07",
      title: "WEATHER TRUTH SCORE CALCULATION",
      tech: "Weighted Bayesian Consensus Model",
      desc: "Computes 0–100 Truth Score: (0.35 &times; SourceReliability) + (0.20 &times; ContentConfidence) + (0.25 &times; LocationConsistency) + (0.20 &times; CrossSourceAgreement)."
    },
    {
      num: "08",
      title: "SEVERITY ASSESSMENT",
      tech: "Spatial Hazard Risk Matrix (High / Medium / Low)",
      desc: "Combines physical event intensity with urban vulnerability, population density overlays, and drainage basin capacity."
    },
    {
      num: "09",
      title: "PROACTIVE ALERT ENGINE",
      tech: "Common Alerting Protocol (CAP) / Fast Broadcast",
      desc: "Generates automated actionable safety SOPs and triggers sub-second location-based geo-fenced push notifications to state command rooms and citizens."
    },
    {
      num: "10",
      title: "DASHBOARD + CITIZEN ALERTS",
      tech: "React 18 + Leaflet GIS + WebSockets",
      desc: "Delivers situational awareness to SDMA / NDRF emergency authorities and sends geo-targeted life-saving alerts to citizens."
    }
  ];

  const techBadges = [
    { name: "React 18", role: "Real-time Command UI", category: "Frontend" },
    { name: "Python 3.11", role: "AI Verification Core", category: "Backend" },
    { name: "FastAPI", role: "High-Speed Async Microservices", category: "API" },
    { name: "PostgreSQL", role: "Relational Persistence", category: "Database" },
    { name: "PostGIS", role: "Spatial Geospatial Indexing", category: "GIS" },
    { name: "Apache Kafka", role: "Distributed Telemetry Bus", category: "Data Stream" },
    { name: "Apache Spark", role: "Batch & Stream Analytics", category: "Big Data" },
    { name: "Machine Learning", role: "Transformer NLP & Anomaly Detection", category: "AI/ML" },
    { name: "GIS & Leaflet", role: "Interactive Spatio-Temporal Maps", category: "Mapping" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Network className="w-6 h-6" />
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                System Architecture & Proposed Production Stack
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl mt-1 leading-relaxed">
              Complete end-to-end intelligence flow from raw multi-source ingestion to automated spatial deduplication, 
              cross-sensor corroboration, Truth Score calculation, and proactive citizen alert dispatch.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
            PROPOSED PRODUCTION ARCHITECTURE
          </div>
        </div>
      </div>

      {/* Proposed Production Technology Stack Badges */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            Proposed Production Technology Badges
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">Enterprise Ready</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {techBadges.map((tech, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-cyan-500/40 transition-all space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{tech.name}</span>
                <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800/40">
                  {tech.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {tech.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Pipeline Flow Step-by-Step */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider px-1 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          End-to-End Intelligence Pipeline Flow
        </h3>

        <div className="space-y-3">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step.num}
              className="relative p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 font-mono font-bold text-xs shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-white tracking-wide">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="md:text-right shrink-0">
                  <span className="inline-block px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono font-semibold text-cyan-300">
                    {step.tech}
                  </span>
                </div>
              </div>

              {idx < pipelineSteps.length - 1 && (
                <div className="flex justify-center -mb-5 mt-2">
                  <div className="p-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    <ArrowDown className="w-3 h-3 text-cyan-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
