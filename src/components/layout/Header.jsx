import React, { useState, useEffect } from 'react';
import { 
  CloudSun, 
  Search, 
  Clock, 
  Menu, 
  Activity, 
  Radio, 
  Compass, 
  ShieldCheck, 
  Layers,
  Key
} from 'lucide-react';
import { NotificationDropdown } from '../common/NotificationDropdown';

export const Header = ({ 
  onSearch, 
  searchQuery, 
  alerts, 
  onSelectAlert, 
  onToggleMobileSidebar,
  totalEventsCount = 30,
  onOpenMapKeyModal,
  mapConfig
}) => {
  const [timeString, setTimeString] = useState("");
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      );
      setDateString(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 border-b border-slate-800 backdrop-blur-xl">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Mobile Toggle & Brand Headline */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                <CloudSun className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    National Weather Intelligence
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/40 px-2 py-0.5 rounded-full">
                    DEMO DATA
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  AI-powered multi-source meteorological verification & proactive alert engine
                </p>
              </div>
            </div>
          </div>

          {/* Middle: Universal Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch && onSearch(e.target.value)}
                placeholder="Search city, state, event type (e.g. Pune, Mumbai, Flooding)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/60 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearch && onSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right: Live Clock, Status, Map Key Button & Notification Tray */}
          <div className="flex items-center gap-2.5">
            
            {/* Map API Key Settings Button */}
            <button
              onClick={onOpenMapKeyModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-xs font-semibold text-cyan-300 hover:text-white transition-all shadow-sm"
              title="Configure Map Tiles, API Keys & OpenWeather Layers"
            >
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Map Key / Layers</span>
            </button>

            {/* Live Indian Time Display */}
            <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="font-mono font-bold text-slate-200 block leading-tight">{timeString}</span>
                <span className="text-[10px] text-slate-400 leading-tight block">{dateString} (IST)</span>
              </div>
            </div>

            {/* Ingestion Stream Status */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium text-[11px]">Telemetry:</span>
              <span className="text-emerald-400 font-bold font-mono text-[11px]">LIVE</span>
            </div>

            {/* Notification Drawer */}
            <NotificationDropdown alerts={alerts} onSelectAlert={onSelectAlert} />
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              placeholder="Search Indian cities or events..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

      </div>
    </header>
  );
};
