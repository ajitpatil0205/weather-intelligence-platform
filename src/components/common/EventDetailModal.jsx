import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Layers, 
  Share2, 
  ShieldCheck, 
  AlertTriangle, 
  Radio, 
  Compass, 
  Send, 
  CheckCircle2, 
  Info,
  ExternalLink
} from 'lucide-react';
import { TruthScoreGauge } from './TruthScoreGauge';
import { SeverityBadge } from './SeverityBadge';
import { StatusBadge } from './StatusBadge';
import { WeatherIcon } from './WeatherIcon';
import { formatCoordinates } from '../../utils/formatters';

export const EventDetailModal = ({ event, isOpen, onClose, onNavigateToMap, onTriggerAlert }) => {
  const [broadcastSent, setBroadcastSent] = useState(false);

  if (!isOpen || !event) return null;

  const handleBroadcast = () => {
    setBroadcastSent(true);
    if (onTriggerAlert) {
      onTriggerAlert(event);
    }
    setTimeout(() => {
      setBroadcastSent(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden my-8">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-cyan-400">
              <WeatherIcon type={event.eventType} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50">
                  {event.id}
                </span>
                <span className="text-xs text-slate-400 font-medium">National Weather Event Dossier</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 mt-0.5">
                {event.eventType} in {event.location}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Top Quick Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Location</span>
                <span className="text-xs font-bold text-slate-200">{event.location}, {event.state}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Timestamp</span>
                <span className="text-xs font-bold text-slate-200">{event.reportedTime} ({event.timestamp})</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Coordinates</span>
                <span className="text-xs font-mono text-slate-200">{formatCoordinates(event.latitude, event.longitude)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              <SeverityBadge severity={event.severity} pulse={event.severity === "HIGH"} />
              <StatusBadge status={event.verificationStatus} />
            </div>
          </div>

          {/* Core Intelligence Grid: Truth Score & Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            
            {/* Left Score Gauge */}
            <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 pb-5 md:pb-0 md:pr-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Weather Truth Score
              </span>
              
              <TruthScoreGauge score={event.truthScore} size={130} strokeWidth={11} showLabel={false} />

              <div className="mt-3 text-center space-y-1">
                <span className="text-xs font-semibold text-slate-300">
                  {event.truthScore >= 80 ? "Verified Authentic" : event.truthScore >= 50 ? "Review Required" : "Unverified Anomaly"}
                </span>
                <p className="text-[11px] text-slate-400">
                  Corroborated across {event.reportsCount || 1} independent telemetry channels
                </p>
              </div>
            </div>

            {/* Right Multi-Factor Verification Breakdown */}
            <div className="md:col-span-8 flex flex-col justify-center space-y-3.5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>AI Multi-Factor Verification Breakdown</span>
                <span className="text-[10px] text-cyan-400 font-mono">Formula: W1·S + W2·C + W3·L + W4·A</span>
              </h4>

              {/* Metric 1: Source Reliability */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Source Reliability Weight</span>
                  <span className="font-mono font-bold text-cyan-400">{event.sourceReliability || 90}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700" 
                    style={{ width: `${event.sourceReliability || 90}%` }}
                  />
                </div>
              </div>

              {/* Metric 2: Content Confidence */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">NLP Content & Context Confidence</span>
                  <span className="font-mono font-bold text-cyan-400">{event.contentConfidence || 88}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-700" 
                    style={{ width: `${event.contentConfidence || 88}%` }}
                  />
                </div>
              </div>

              {/* Metric 3: Location Consistency */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Spatial & Geospatial Consistency</span>
                  <span className="font-mono font-bold text-cyan-400">{event.locationConsistency || 95}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full transition-all duration-700" 
                    style={{ width: `${event.locationConsistency || 95}%` }}
                  />
                </div>
              </div>

              {/* Metric 4: Cross-Source Agreement */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Cross-Source Multi-Sensor Agreement</span>
                  <span className="font-mono font-bold text-cyan-400">{event.crossSourceAgreement || 90}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-700" 
                    style={{ width: `${event.crossSourceAgreement || 90}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Narrative & Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              Event Situation Summary
            </h4>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-sm text-slate-200 leading-relaxed">
              {event.description}
            </div>
          </div>

          {/* Sources & Supporting Citations */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              Supporting Telemetry & Corroborating Sources ({event.reportsCount || 1} Reports)
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Primary Reporting Ingest</span>
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
                  <span className="text-xs font-bold text-white">{event.primarySource || event.source}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Impacted Population / Area</span>
                <span className="text-xs font-medium text-slate-200">{event.affectedPopulation || "Urban Metropolitan Core"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {(event.supportingSources || [event.source]).map((src, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  {src}
                </span>
              ))}
            </div>
          </div>

          {/* Actionable SOP Guidelines */}
          {event.recommendedAction && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    Recommended Authority & Public Action SOP
                  </h5>
                  <p className="text-xs text-amber-100/90 leading-relaxed">
                    {event.recommendedAction}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Prototype / Demo Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>
              <strong className="text-slate-300">DEMO SCORING MODEL:</strong> Calculated for prototype simulation and SIH evaluation. Not an official IMD meteorological bulletin.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-950/90 border-t border-slate-800">
          <button
            onClick={() => {
              if (onNavigateToMap) onNavigateToMap(event);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-xs border border-slate-700 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Focus on Live Map
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBroadcast}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                broadcastSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-500/20'
              }`}
            >
              {broadcastSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Alert Dispatched to SDMA
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Simulate Proactive Public Alert
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
