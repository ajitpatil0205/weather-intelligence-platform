import React, { useState } from 'react';
import { 
  RadioTower, 
  CheckCircle2, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Database, 
  Cpu, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { MOCK_SOURCES } from '../../data/mockSources';
import { formatNumber } from '../../utils/formatters';

export const SourcesView = () => {
  const [sourcesList, setSourcesList] = useState(MOCK_SOURCES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSimulateSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSourcesList(prev => prev.map(s => ({
        ...s,
        reportsReceivedToday: s.reportsReceivedToday + Math.floor(Math.random() * 25 + 5),
        lastUpdate: "Just now"
      })));
      setIsRefreshing(false);
    }, 800);
  };

  const totalReportsToday = sourcesList.reduce((acc, curr) => acc + curr.reportsReceivedToday, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner & Telemetry Health */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <RadioTower className="w-6 h-6" />
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Data Ingestion & Multi-Source Health Monitoring
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry status, credibility weight matrices, and API health across all 8 weather feeds
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Reports Ingested Today</span>
            <span className="text-base font-black text-cyan-400 font-mono">
              {formatNumber(totalReportsToday)}
            </span>
          </div>

          <button
            onClick={handleSimulateSync}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Sync Ingestion
          </button>
        </div>
      </div>

      {/* Grid of 8 Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sourcesList.map((src) => {
          let statusBadge = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
          if (src.status === "ACTIVE") statusBadge = "bg-blue-500/15 text-blue-400 border-blue-500/30";
          if (src.status === "MONITORING") statusBadge = "bg-amber-500/15 text-amber-400 border-amber-500/30";

          return (
            <div
              key={src.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-4 flex flex-col justify-between"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {src.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusBadge}`}>
                    {src.status}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white mb-1">
                  {src.name}
                </h3>
                <span className="text-[11px] text-slate-400 font-medium block mb-2">
                  {src.type}
                </span>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {src.description}
                </p>
              </div>

              {/* Reliability Meter & Stats */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                {/* Reliability Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      Credibility Weight
                    </span>
                    <span className="font-mono font-bold text-emerald-400">{src.reliability}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                      style={{ width: `${src.reliability}%` }}
                    />
                  </div>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Reports / Day</span>
                    <span className="font-mono font-bold text-white">{formatNumber(src.reportsReceivedToday)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Avg Latency</span>
                    <span className="font-mono font-bold text-cyan-400">{src.latencyMs} ms</span>
                  </div>
                </div>

                {/* Protocol & Uptime */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Protocol: <strong className="text-slate-200">{src.dataProtocol}</strong></span>
                  <span className="text-emerald-400 font-mono font-bold">{src.uptime}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
