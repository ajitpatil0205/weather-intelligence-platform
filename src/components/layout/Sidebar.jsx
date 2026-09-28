import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert,
  CopyCheck, 
  BellRing, 
  BarChart3, 
  RadioTower, 
  Network, 
  Activity, 
  CheckCircle, 
  X,
  Sparkles
} from 'lucide-react';

export const Sidebar = ({ 
  activeTab = "dashboard", 
  onSelectTab, 
  isOpenMobile = false, 
  onCloseMobile,
  activeAlertsCount = 12,
  verifiedEventsCount = 186
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
    { id: "map", label: "Live Weather Map", icon: MapPin, badge: "Live" },
    { id: "events", label: "Weather Events", icon: AlertTriangle, badge: "30+" },
    { id: "verification", label: "Verification Center", icon: ShieldCheck, badge: "AI Core" },
    { id: "duplicates", label: "Duplicate Detection", icon: CopyCheck, badge: null },
    { id: "alerts", label: "Proactive Alerts", icon: BellRing, badge: activeAlertsCount > 0 ? `${activeAlertsCount}` : null, badgeColor: "bg-red-500 text-white" },
    { id: "analytics", label: "Analytics & Trends", icon: BarChart3, badge: null },
    { id: "admin", label: "Admin & #IMD Harvester", icon: ShieldAlert, badge: "Control", badgeColor: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" },
    { id: "sources", label: "Data Sources", icon: RadioTower, badge: "8 Ingests" },
    { id: "architecture", label: "System Architecture", icon: Network, badge: "SIH Tech" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpenMobile ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-white">COMMAND NAVIGATION</span>
          </div>
          <button 
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Section */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Intelligence Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all
                  ${isActive 
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 font-bold border border-cyan-500/30 shadow-lg shadow-cyan-500/5" 
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 border border-transparent"}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    item.badgeColor || (isActive ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "bg-slate-800 text-slate-400")
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom System & Demo Status Cards */}
        <div className="p-3 border-t border-slate-800/90 bg-slate-950 space-y-2.5">
          
          {/* System Online Badge */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-slate-200">System Online</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              99.98%
            </span>
          </div>

          {/* Demo Mode Notice */}
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Demo Mode
              </span>
              <span className="text-[9px] font-mono text-amber-200/70">Frontend Only</span>
            </div>
            <p className="text-[10px] text-amber-200/80 leading-snug">
              Simulated telemetry dataset for Smart India Hackathon.
            </p>
          </div>

        </div>
      </aside>
    </>
  );
};
