import React, { useState } from 'react';
import { 
  BellRing, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Send, 
  Radio, 
  Eye, 
  Compass, 
  PlusCircle, 
  History, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { SeverityBadge } from '../common/SeverityBadge';
import { WeatherIcon } from '../common/WeatherIcon';
import { MOCK_HISTORICAL_ALERTS } from '../../data/mockAlerts';

export const ProactiveAlertsView = ({ 
  alerts = [], 
  onSelectEvent, 
  onNavigateToMap,
  onAcknowledgeAlert,
  onCreateCustomAlert,
  events = []
}) => {
  const [activeSubTab, setActiveSubTab] = useState("active"); // 'active' | 'history' | 'simulator'
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [simulatedAlerts, setSimulatedAlerts] = useState(alerts);

  // New Custom Alert Form
  const [newCity, setNewCity] = useState("Nashik, Maharashtra");
  const [newType, setNewType] = useState("Thunderstorm");
  const [newSeverity, setNewSeverity] = useState("HIGH");
  const [newTruthScore, setNewTruthScore] = useState(94);
  const [newAction, setNewAction] = useState("Stay indoors; high lightning frequency detected around Nashik rural belt.");
  const [createdNotice, setCreatedNotice] = useState(false);

  const activeAlerts = simulatedAlerts.filter(a => a.status === "ACTIVE");
  const highPriorityCount = activeAlerts.filter(a => a.severity === "HIGH").length;
  const mediumPriorityCount = activeAlerts.filter(a => a.severity === "MEDIUM").length;

  const filteredActiveAlerts = activeAlerts.filter(a => {
    if (severityFilter !== "ALL" && a.severity !== severityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return a.title.toLowerCase().includes(q) || 
             a.location.toLowerCase().includes(q) || 
             a.eventType.toLowerCase().includes(q);
    }
    return true;
  });

  const handleAcknowledge = (id) => {
    setSimulatedAlerts(prev => prev.map(a => a.id === id ? { ...a, isAcknowledged: true } : a));
    if (onAcknowledgeAlert) onAcknowledgeAlert(id);
  };

  const handleCreateAlert = (e) => {
    e.preventDefault();
    const newAlertObj = {
      id: `ALT-${Math.floor(820 + Math.random() * 80)}`,
      title: `${newType} Emergency Advisory`,
      eventType: newType,
      location: newCity,
      region: `${newCity.split(",")[0]} Urban & Suburbs`,
      severity: newSeverity,
      truthScore: Number(newTruthScore),
      time: "Just now",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourcesCount: 5,
      status: "ACTIVE",
      affectedArea: `${newCity.split(",")[0]} District (Radius: 20 km)`,
      affectedPopulation: "~250,000 residents",
      recommendedAction: newAction,
      broadcastStatus: "DISPATCHED",
      isAcknowledged: false
    };

    setSimulatedAlerts([newAlertObj, ...simulatedAlerts]);
    setCreatedNotice(true);
    setTimeout(() => {
      setCreatedNotice(false);
      setActiveSubTab("active");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Alert Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-500/20 text-red-400">
            <BellRing className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Proactive Alerts</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{activeAlerts.length}</span>
              <span className="text-xs text-red-400 font-bold">Auto-Dispatched</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-600/20 text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">High Priority</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-red-400">{highPriorityCount}</span>
              <span className="text-xs text-slate-400 font-medium">Critical threat</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Medium Priority</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-400">{mediumPriorityCount}</span>
              <span className="text-xs text-slate-400 font-medium">Precautionary</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Dispatched via CAP / SMS</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400">100%</span>
              <span className="text-xs text-slate-400 font-medium">To SDMAs & Citizens</span>
            </div>
          </div>
        </div>

      </div>

      {/* Tabs & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab("active")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === "active"
                ? "bg-red-600 text-white shadow-md shadow-red-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BellRing className="w-3.5 h-3.5" />
            Active Alerts ({activeAlerts.length})
          </button>

          <button
            onClick={() => setActiveSubTab("history")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === "history"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Alert History ({MOCK_HISTORICAL_ALERTS.length})
          </button>

          <button
            onClick={() => setActiveSubTab("simulator")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === "simulator"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Trigger New Alert
          </button>
        </div>

        {/* Search & Severity Filter */}
        {activeSubTab === "active" && (
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alerts..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {["ALL", "HIGH", "MEDIUM", "LOW"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    severityFilter === sev
                      ? "bg-slate-800 text-white font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Tab 1: Active Alerts Feed */}
      {activeSubTab === "active" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredActiveAlerts.map((alert) => {
            const correspondingEvent = events.find(e => e.id === alert.eventId || e.location.includes(alert.location.split(",")[0]));
            
            return (
              <div
                key={alert.id}
                className={`p-6 rounded-3xl bg-slate-900/90 border transition-all shadow-xl space-y-4 ${
                  alert.severity === "HIGH"
                    ? "border-red-500/30 hover:border-red-500/60 bg-gradient-to-br from-red-950/20 via-slate-900 to-slate-900"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Alert Top Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400">
                      <WeatherIcon type={alert.eventType} className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block">
                        {alert.id} • {alert.eventType}
                      </span>
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {alert.location}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={alert.severity} pulse={alert.severity === "HIGH"} />
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {alert.time}
                    </span>
                  </div>
                </div>

                {/* Alert Title & Location Info */}
                <div>
                  <h4 className="text-sm font-extrabold text-white mb-1">
                    {alert.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Affected Area: <strong className="text-slate-200">{alert.affectedArea}</strong></span>
                  </div>
                </div>

                {/* Score & Telemetry Badges */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Weather Truth Score</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{alert.truthScore}% Verified</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Corroborating Feeds</span>
                    <span className="font-medium text-slate-200">{alert.sourcesCount} Independent Sources</span>
                  </div>
                </div>

                {/* Actionable SOP Safety Directive */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Automated Public & Authority Action SOP:
                  </span>
                  <p className="text-amber-100/90 leading-relaxed">
                    {alert.recommendedAction}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    {correspondingEvent && (
                      <button
                        onClick={() => onSelectEvent && onSelectEvent(correspondingEvent)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold border border-slate-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Event Dossier
                      </button>
                    )}

                    {correspondingEvent && (
                      <button
                        onClick={() => onNavigateToMap && onNavigateToMap(correspondingEvent)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        View Map
                      </button>
                    )}
                  </div>

                  <div>
                    {alert.isAcknowledged ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/40">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Acknowledged
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-all"
                      >
                        Acknowledge Alert
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Alert History */}
      {activeSubTab === "history" && (
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Historical Proactive Alerts Log</h3>
            <p className="text-xs text-slate-400">Resolved, expired, and archived alert records</p>
          </div>

          <div className="divide-y divide-slate-800/60">
            {MOCK_HISTORICAL_ALERTS.map((hist) => (
              <div key={hist.id} className="p-4 hover:bg-slate-800/40 transition-colors flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {hist.id}
                    </span>
                    <span className="text-xs font-bold text-white">{hist.title}</span>
                    <SeverityBadge severity={hist.severity} size="sm" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {hist.summary}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>Location: <strong>{hist.location}</strong></span>
                    <span>•</span>
                    <span>Duration: {hist.duration}</span>
                    <span>•</span>
                    <span>Resolved: {hist.resolvedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    hist.status === "RESOLVED" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}>
                    {hist.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Custom Alert Dispatch Simulator */}
      {activeSubTab === "simulator" && (
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Proactive Alert Engine Simulator
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate triggering an automated multi-channel CAP warning to state authorities and citizen apps
            </p>
          </div>

          {createdNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Alert successfully created and added to active live alert feed!
            </div>
          )}

          <form onSubmit={handleCreateAlert} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Target Location (City, State)</label>
                <input
                  type="text"
                  required
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Event Classification</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  {["Flooding", "Heavy Rainfall", "Thunderstorm", "Heatwave", "Cyclone", "Lightning", "Dust Storm", "Fog"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Severity Level</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="HIGH">HIGH Severity</option>
                  <option value="MEDIUM">MEDIUM Severity</option>
                  <option value="LOW">LOW Severity</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Truth Score Threshold: {newTruthScore}%</label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={newTruthScore}
                  onChange={(e) => setNewTruthScore(Number(e.target.value))}
                  className="w-full mt-2 accent-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Public & Authority Action SOP Recommendation</label>
              <textarea
                rows={3}
                required
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-cyan-600 hover:from-red-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Dispatch Simulated Proactive Alert
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
