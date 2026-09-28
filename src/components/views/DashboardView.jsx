import React, { useState } from 'react';
import { 
  CloudLightning, 
  ShieldCheck, 
  AlertTriangle, 
  BellRing, 
  Activity, 
  RadioTower, 
  Flame, 
  ArrowUpRight, 
  Layers, 
  Eye, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import { WeatherMap } from '../common/WeatherMap';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { WeatherIcon } from '../common/WeatherIcon';
import { WEATHER_TYPES } from '../../data/weatherTypes';

export const DashboardView = ({ 
  events = [], 
  alerts = [], 
  onSelectEvent, 
  onNavigateToTab,
  onAcknowledgeAlert,
  mapConfig = { providerId: "carto-dark" } 
}) => {
  const [mapFilter, setMapFilter] = useState("ALL");

  const filteredMapEvents = events.filter((evt) => {
    if (mapFilter === "ALL") return true;
    return evt.severity === mapFilter;
  });

  const highSeverityCount = events.filter(e => e.severity === "HIGH").length;
  const verifiedCount = events.filter(e => e.verificationStatus === "VERIFIED").length;
  const activeAlerts = alerts.filter(a => a.status === "ACTIVE");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 6 Core National Intelligence KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* KPI 1: Total Events */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Events</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">248</span>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +14%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Live pan-India aggregate</span>
        </div>

        {/* KPI 2: Verified Events */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Verified Events</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">186</span>
            <span className="text-[10px] text-slate-400 font-mono">75.0%</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Truth Score &ge; 80%</span>
        </div>

        {/* KPI 3: High Severity */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl hover:border-red-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">High Severity</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-red-400">37</span>
            <span className="text-[10px] text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded font-bold">
              CRITICAL
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Immediate action required</span>
        </div>

        {/* KPI 4: Active Alerts */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Alerts</span>
            <BellRing className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">{activeAlerts.length || 12}</span>
            <span className="text-[10px] text-amber-400 font-bold">5 High</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Broadcasted to SDMAs</span>
        </div>

        {/* KPI 5: Avg Truth Score */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Avg Truth Score</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-cyan-300">84.7%</span>
            <span className="text-[10px] text-emerald-400 font-bold">High Conf</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Weighted AI consensus</span>
        </div>

        {/* KPI 6: Ingest Sources */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Data Sources</span>
            <RadioTower className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-400">8</span>
            <span className="text-[10px] text-emerald-400 font-bold font-mono">100% UP</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">IMD, AWS, APIs & Crowds</span>
        </div>

      </div>

      {/* Main Command Center: Live Map & Proactive Alerts split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (8 cols): Interactive Map Section */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  National Weather Situation Map
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time geospatial event clustering across India with verification badges
              </p>
            </div>

            {/* Quick Severity Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {["ALL", "HIGH", "MEDIUM", "LOW"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setMapFilter(sev)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    mapFilter === sev
                      ? sev === "HIGH" 
                        ? "bg-red-500 text-white shadow-sm"
                        : sev === "MEDIUM"
                        ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                        : sev === "LOW"
                        ? "bg-sky-500 text-white shadow-sm"
                        : "bg-cyan-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map View */}
          <WeatherMap
            events={filteredMapEvents}
            onSelectEvent={onSelectEvent}
            height="480px"
            showHeatmap={true}
            mapConfig={mapConfig}
          />

          {/* Map Legend Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-slate-400 font-bold text-[11px] uppercase">Map Legend:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></span>
                <span className="text-slate-300">High Severity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
                <span className="text-slate-300">Medium Severity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50"></span>
                <span className="text-slate-300">Low Severity</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateToTab && onNavigateToTab("map")}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold text-xs"
            >
              Open Full-Screen Map <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Col (4 cols): Recent Alerts & Action Feed */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400">
                <BellRing className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Proactive Alerts Feed
              </h3>
            </div>

            <button
              onClick={() => onNavigateToTab && onNavigateToTab("alerts")}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-0.5"
            >
              View All ({alerts.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[530px] overflow-y-auto pr-1">
            {alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-2xl bg-slate-900/90 border transition-all ${
                  alert.severity === "HIGH" 
                    ? "border-red-500/30 hover:border-red-500/60 bg-gradient-to-br from-red-950/20 to-slate-900" 
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <SeverityBadge severity={alert.severity} size="sm" pulse={alert.severity === "HIGH"} />
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {alert.time}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white leading-snug mb-1">
                  {alert.title}
                </h4>

                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-3">
                  {alert.recommendedAction}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40 font-mono">
                      Truth: {alert.truthScore}%
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {alert.sourcesCount} Sources
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {alert.isAcknowledged ? (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Ack
                      </span>
                    ) : (
                      <button
                        onClick={() => onAcknowledgeAlert && onAcknowledgeAlert(alert.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-semibold text-slate-300 border border-slate-700 transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Weather Event Categories Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Monitored Meteorological Event Classifications
            </h3>
          </div>
          <span className="text-xs text-slate-400">10 Active Classifiers</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {WEATHER_TYPES.slice(0, 5).map((wt) => (
            <div
              key={wt.id}
              className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-3"
            >
              <div className={`p-2.5 rounded-xl ${wt.bgClass}`}>
                <WeatherIcon type={wt.name} className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">{wt.name}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-black text-cyan-400">{wt.activeCount} Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Weather Events Table Quick Section */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Activity className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Active National Weather Event Stream
              </h3>
              <p className="text-xs text-slate-400">
                Sorted by AI Weather Truth Score & Ingestion Priority
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab && onNavigateToTab("events")}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1"
          >
            Full Event Registry <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Event ID</th>
                <th className="px-4 py-3">Event Type</th>
                <th className="px-4 py-3">Location & State</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Truth Score</th>
                <th className="px-4 py-3">Verification</th>
                <th className="px-4 py-3">Primary Source</th>
                <th className="px-4 py-3">Reports</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {events.slice(0, 8).map((evt) => (
                <tr 
                  key={evt.id}
                  onClick={() => onSelectEvent && onSelectEvent(evt)}
                  className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-cyan-400">
                    {evt.id}
                  </td>
                  <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                    <WeatherIcon type={evt.eventType} className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{evt.eventType}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-200">
                    {evt.location}, <span className="text-slate-400">{evt.state}</span>
                  </td>
                  <td className="px-4 py-3">
                    <SeverityBadge severity={evt.severity} size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400">{evt.truthScore}%</span>
                      <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                        <div 
                          className="h-full bg-emerald-400 rounded-full" 
                          style={{ width: `${evt.truthScore}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={evt.verificationStatus} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-slate-300 truncate max-w-[140px]">
                    {evt.primarySource || evt.source}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      {evt.reportsCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                    {evt.reportedTime}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent && onSelectEvent(evt);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 font-bold border border-cyan-500/30 transition-all text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
