import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  FileText, 
  Cpu, 
  Sparkles, 
  RotateCcw,
  Send
} from 'lucide-react';
import { TruthScoreGauge } from '../common/TruthScoreGauge';
import { calculateTruthScore } from '../../utils/scoringEngine';
import { StatusBadge } from '../common/StatusBadge';

export const VerificationCenterView = ({ events = [], onSelectEvent }) => {
  // Interactive Simulation Sandbox States
  const [sourceReliability, setSourceReliability] = useState(90);
  const [contentConfidence, setContentConfidence] = useState(88);
  const [locationConsistency, setLocationConsistency] = useState(95);
  const [crossSourceAgreement, setCrossSourceAgreement] = useState(91);

  // Selected sample incoming report for verification inspection
  const [selectedReportId, setSelectedReportId] = useState("REP-1028");

  const sampleReports = [
    {
      id: "REP-1028",
      title: "Heavy rainfall causing waterlogging in Pune",
      location: "Pune, Maharashtra",
      sourceType: "Citizen Report & Smart Sensor",
      sourceName: "Citizen App #7731",
      timestamp: "10:32 AM",
      snippet: "Sinhagad road underpass submerged under 3.5ft water after continuous heavy downpour. Vehicles stalled.",
      sourceReliability: 70,
      contentConfidence: 88,
      locationConsistency: 95,
      crossSourceAgreement: 91,
      truthScore: 86,
      status: "VERIFIED",
      supportingSources: ["IMD Doppler Radar", "OpenWeatherMap API", "PMC IoT Level Node", "Social Media Pulse"],
      dedupStatus: "Merged with 3 other reports"
    },
    {
      id: "REP-1029",
      title: "Intense squall with fallen trees on VIP Road",
      location: "Bhopal, Madhya Pradesh",
      sourceType: "Social Media NLP",
      sourceName: "Twitter/X Ingest @BhopalNews",
      timestamp: "06:20 AM",
      snippet: "Sudden gusty winds reaching 45 km/h broke tree branches near Upper Lake. No waterlogging.",
      sourceReliability: 45,
      contentConfidence: 74,
      locationConsistency: 81,
      crossSourceAgreement: 72,
      truthScore: 68,
      status: "REVIEW",
      supportingSources: ["Bhopal Bairagarh AWS"],
      dedupStatus: "Single uncorroborated cluster"
    },
    {
      id: "REP-1030",
      title: "Alleged Embankment Breach Rumor",
      location: "Patna, Bihar",
      sourceType: "Unverified Viral Social Video",
      sourceName: "Telegram Disaster Video Channel",
      timestamp: "12:15 AM",
      snippet: "Video showing massive flood breach claimed to be Digha Ghat; CWC river sensors show water 1.2m below alert.",
      sourceReliability: 35,
      contentConfidence: 38,
      locationConsistency: 45,
      crossSourceAgreement: 40,
      truthScore: 39,
      status: "UNVERIFIED",
      supportingSources: ["0 Supporting Radar/Sensors"],
      dedupStatus: "Flagged as Conflicting Anomaly"
    },
    {
      id: "REP-1031",
      title: "Deep Cyclonic Gale Gusts 95 km/h",
      location: "Chennai, Tamil Nadu",
      sourceType: "IMD Doppler & INSAT Satellite",
      sourceName: "RMC Chennai Regional Desk",
      timestamp: "09:40 AM",
      snippet: "Deep depression approaching north Tamil Nadu coast with high storm surge and 95 km/h squally gales.",
      sourceReliability: 100,
      contentConfidence: 98,
      locationConsistency: 99,
      crossSourceAgreement: 96,
      truthScore: 98,
      status: "VERIFIED",
      supportingSources: ["IMD Cyclone Centre", "INSAT-3DR Satellite", "Coast Guard Buoy", "Ennore Port Sensor"],
      dedupStatus: "Corroborated by 12 telemetry feeds"
    }
  ];

  const currentReport = sampleReports.find(r => r.id === selectedReportId) || sampleReports[0];

  // Calculated score for the interactive sandbox
  const liveCalculation = calculateTruthScore({
    sourceReliability,
    contentConfidence,
    locationConsistency,
    crossSourceAgreement
  });

  const loadReportToSandbox = (report) => {
    setSelectedReportId(report.id);
    setSourceReliability(report.sourceReliability);
    setContentConfidence(report.contentConfidence);
    setLocationConsistency(report.locationConsistency);
    setCrossSourceAgreement(report.crossSourceAgreement);
  };

  const handleResetSandbox = () => {
    setSourceReliability(90);
    setContentConfidence(88);
    setLocationConsistency(95);
    setCrossSourceAgreement(91);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner & SIH Presentation Intro */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                AI Cross-Source Verification & Truth Scoring Engine
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Every incoming weather alert, citizen report, or sensor signal undergoes rigorous multi-layer verification 
              before reaching authorities and the public. Combines source credibility, NLP intent extraction, spatial consistency, and multi-source consensus.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/60">
              Active Verification Consensus: 99.4%
            </span>
          </div>
        </div>

        {/* 8-Stage Visual Verification Pipeline Flow */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">
            Real-Time 8-Stage Verification Architecture Pipeline
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { stage: "01", name: "Report Ingest", desc: "Multi-Source API/App" },
              { stage: "02", name: "Source Check", desc: "Credibility Weight" },
              { stage: "03", name: "NLP Analysis", desc: "Entity & Severity" },
              { stage: "04", name: "Geo Consistency", desc: "Spatial Boundary" },
              { stage: "05", name: "Duplicate Check", desc: "Clustering / Merge" },
              { stage: "06", name: "Cross-Source", desc: "Multi-Sensor Match" },
              { stage: "07", name: "Truth Scoring", desc: "Weighted Formula" },
              { stage: "08", name: "Verification", desc: "Verified / Alert SOP" },
            ].map((step, idx) => (
              <div
                key={step.stage}
                className="relative p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-center flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono font-bold mb-1">
                  <span>STAGE {step.stage}</span>
                  {idx < 7 && <ArrowRight className="w-3 h-3 text-slate-600 hidden lg:block" />}
                </div>
                <div className="text-xs font-bold text-white leading-tight">{step.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Incoming Reports Inspector & Live Truth Score Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Incoming Reports Stream Selector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  Incoming Signal Queue for Verification
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Select to inspect</span>
            </div>

            <div className="space-y-3">
              {sampleReports.map((rep) => {
                const isSelected = rep.id === selectedReportId;
                return (
                  <div
                    key={rep.id}
                    onClick={() => loadReportToSandbox(rep)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-950/30 border-cyan-500 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                        {rep.id}
                      </span>
                      <StatusBadge status={rep.status} size="sm" />
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug mb-1">
                      {rep.title}
                    </h4>

                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-2">
                      "{rep.snippet}"
                    </p>

                    <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-800 text-slate-400">
                      <span>Source: <strong className="text-slate-200">{rep.sourceName}</strong></span>
                      <span className="font-mono font-bold text-cyan-400">Score: {rep.truthScore}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Interactive AI Truth Score Sandbox */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-extrabold text-white tracking-tight">
                    Multi-Factor Truth Scoring Simulator
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Inspect & test how algorithmic weight factors influence final Weather Truth Score
                </p>
              </div>

              <button
                onClick={handleResetSandbox}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </div>

            {/* Score Output Card */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="sm:col-span-5 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-4">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Calculated Truth Score
                </span>
                <TruthScoreGauge score={liveCalculation.score} size={135} strokeWidth={11} showLabel={false} />
                <div className="mt-2 text-center">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    liveCalculation.score >= 80 ? 'text-emerald-400' : liveCalculation.score >= 50 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {liveCalculation.status} STATUS
                  </span>
                </div>
              </div>

              <div className="sm:col-span-7 flex flex-col justify-center space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Mathematical Formula:</span>
                  <div className="font-mono text-[11px] text-cyan-300 leading-snug">
                    Truth Score = (0.35 &times; Source) + (0.20 &times; Content) + (0.25 &times; Location) + (0.20 &times; Agreement)
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span><strong>&ge; 80 / 100:</strong> Auto-Verified & Broadcasts Proactive Alert</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span><strong>50 - 79 / 100:</strong> Flagged for Human Meteorologist Review</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span><strong>&lt; 50 / 100:</strong> Filtered as Unreliable Noise or Hoax</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Weight Sliders */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Adjust Verification Parameters (Live Reactivity):
              </span>

              {/* Slider 1: Source Reliability */}
              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    Source Reliability (Weight: 35%)
                  </label>
                  <span className="font-mono font-bold text-cyan-400 text-sm">{sourceReliability}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sourceReliability}
                  onChange={(e) => setSourceReliability(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <span className="text-[10px] text-slate-400 block">
                  IMD Doppler = 100% • IoT AWS = 90% • Citizen App = 70% • Social Media = 45%
                </span>
              </div>

              {/* Slider 2: Content Confidence */}
              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    NLP Content & Semantic Confidence (Weight: 20%)
                  </label>
                  <span className="font-mono font-bold text-cyan-400 text-sm">{contentConfidence}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={contentConfidence}
                  onChange={(e) => setContentConfidence(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <span className="text-[10px] text-slate-400 block">
                  Evaluates keyword specificity, syntactic clarity, meteorological terminology, and image OCR.
                </span>
              </div>

              {/* Slider 3: Location Consistency */}
              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    Spatial & Geospatial Consistency (Weight: 25%)
                  </label>
                  <span className="font-mono font-bold text-cyan-400 text-sm">{locationConsistency}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={locationConsistency}
                  onChange={(e) => setLocationConsistency(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <span className="text-[10px] text-slate-400 block">
                  Checks device GPS coordinates against reverse-geocoded boundaries and historical terrain vulnerabilities.
                </span>
              </div>

              {/* Slider 4: Cross-Source Agreement */}
              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Cross-Source Multi-Sensor Corroboration (Weight: 20%)
                  </label>
                  <span className="font-mono font-bold text-cyan-400 text-sm">{crossSourceAgreement}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={crossSourceAgreement}
                  onChange={(e) => setCrossSourceAgreement(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <span className="text-[10px] text-slate-400 block">
                  Number of independent telemetry nodes reporting the identical event within a 15-minute window.
                </span>
              </div>
            </div>

            {/* Supporting Sources for currently inspected report */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Corroborating Telemetry Network for {currentReport.id}:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentReport.supportingSources.map((src, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    {src}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
