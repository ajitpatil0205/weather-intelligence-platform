import React, { useState } from 'react';
import { 
  MapPin, 
  Filter, 
  Layers, 
  Search, 
  RotateCcw, 
  Flame, 
  ShieldCheck, 
  Eye, 
  Compass, 
  Info,
  Maximize2,
  Key
} from 'lucide-react';
import { WeatherMap } from '../common/WeatherMap';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { WEATHER_TYPES } from '../../data/weatherTypes';
import { MAP_PROVIDERS } from '../common/MapKeyModal';

export const LiveMapView = ({ 
  events = [], 
  onSelectEvent, 
  selectedEvent, 
  mapConfig = { providerId: "carto-dark" },
  onOpenMapKeyModal 
}) => {
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedSeverity, setSelectedSeverity] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [mapCenter, setMapCenter] = useState([22.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const activeProvider = MAP_PROVIDERS.find(p => p.id === mapConfig.providerId) || MAP_PROVIDERS[0];

  const regionPresets = [
    { name: "All India", center: [22.5937, 78.9629], zoom: 5 },
    { name: "North India (Delhi/Himalayas)", center: [29.5000, 77.0000], zoom: 6 },
    { name: "West (Mumbai/Gujarat)", center: [20.5000, 74.0000], zoom: 6 },
    { name: "South (Chennai/Bengaluru/Kochi)", center: [13.0000, 77.5000], zoom: 6 },
    { name: "East (Kolkata/Bihar/Odisha)", center: [22.5000, 86.0000], zoom: 6 },
    { name: "Northeast (Assam/Tripura)", center: [25.5000, 92.5000], zoom: 6 }
  ];

  const filteredEvents = events.filter((evt) => {
    // Type filter
    if (selectedType !== "ALL" && evt.eventType.toLowerCase().replace(/[\s-_]+/g, '') !== selectedType.toLowerCase().replace(/[\s-_]+/g, '')) {
      return false;
    }
    // Severity filter
    if (selectedSeverity !== "ALL" && evt.severity !== selectedSeverity) {
      return false;
    }
    // Status filter
    if (selectedStatus !== "ALL" && evt.verificationStatus !== selectedStatus) {
      return false;
    }
    // Search query
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match = evt.location.toLowerCase().includes(q) ||
                    evt.state.toLowerCase().includes(q) ||
                    evt.eventType.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleSelectRegion = (preset) => {
    setMapCenter(preset.center);
    setMapZoom(preset.zoom);
  };

  const handleResetFilters = () => {
    setSelectedType("ALL");
    setSelectedSeverity("ALL");
    setSelectedStatus("ALL");
    setSearchTerm("");
    setMapCenter([22.5937, 78.9629]);
    setMapZoom(5);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* Top Controls Header */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  National Interactive Weather Situation Map
                </h2>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 hidden sm:inline">
                  {activeProvider.name.split("(")[0]}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Displaying {filteredEvents.length} active geocoded event clusters across India
              </p>
            </div>
          </div>

          {/* Quick Region Presets & Map Key Button */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={onOpenMapKeyModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white text-xs font-bold border border-cyan-500/40 shadow-sm transition-all mr-1"
              title="Configure Map Tiles & API Keys"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Map Key / Provider</span>
            </button>

            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1 hidden sm:inline">Regions:</span>
            {regionPresets.map((region) => (
              <button
                key={region.name}
                onClick={() => handleSelectRegion(region)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2 border-t border-slate-800">
          
          {/* Search Field */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search location..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Event Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Event Types (10)</option>
              {WEATHER_TYPES.map((wt) => (
                <option key={wt.id} value={wt.name}>
                  {wt.name}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Severities</option>
              <option value="HIGH">High Severity (Red)</option>
              <option value="MEDIUM">Medium Severity (Orange)</option>
              <option value="LOW">Low Severity (Blue)</option>
            </select>
          </div>

          {/* Verification Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Verification Statuses</option>
              <option value="VERIFIED">Verified (&ge;80% Truth)</option>
              <option value="REVIEW">Under Review (50-79%)</option>
              <option value="UNVERIFIED">Unverified (&lt;50%)</option>
            </select>
          </div>

          {/* Toggle Heatmap & Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                showHeatmap 
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" 
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              {showHeatmap ? "Heatmap On" : "Heatmap Off"}
            </button>

            <button
              onClick={handleResetFilters}
              title="Reset Filters"
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Map Container */}
      <WeatherMap
        events={filteredEvents}
        selectedEvent={selectedEvent}
        onSelectEvent={onSelectEvent}
        height="640px"
        showHeatmap={showHeatmap}
        mapCenter={mapCenter}
        mapZoom={mapZoom}
        mapConfig={mapConfig}
      />

      {/* Bottom Information & Legend Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <span className="font-bold text-[11px] uppercase text-slate-400">Severity Indicators:</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
            <span>HIGH &ge; Severe Threat</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            <span>MEDIUM &ge; Advisory</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50" />
            <span>LOW &ge; Informational</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400">
          Click any marker to inspect supporting telemetry and trigger alerts.
        </div>
      </div>

    </div>
  );
};
