import React, { useState, useRef, useEffect } from 'react';
import { Bell, AlertOctagon, CheckCircle2, ShieldAlert, X } from 'lucide-react';

export const NotificationDropdown = ({ alerts = [], onSelectAlert }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(alerts.filter(a => !a.isAcknowledged).length);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setUnreadCount(alerts.filter(a => !a.isAcknowledged).length);
  }, [alerts]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        title="Intelligence Alerts & Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-96 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Live Intelligence Stream</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                {unreadCount} Active
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-800/60">
            {alerts.slice(0, 6).map((alert) => (
              <div
                key={alert.id}
                onClick={() => {
                  if (onSelectAlert) onSelectAlert(alert);
                  setIsOpen(false);
                }}
                className={`p-3.5 hover:bg-slate-800/60 cursor-pointer transition-colors ${
                  !alert.isAcknowledged ? 'bg-cyan-950/20' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                    alert.severity === 'HIGH' 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    <AlertOctagon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-white truncate">
                        {alert.location}
                      </span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {alert.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        Score: {alert.truthScore}%
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {alert.sourcesCount} Sources
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-900 border-t border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 font-medium">
              Proactive multi-source verification active
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
