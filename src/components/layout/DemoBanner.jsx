import React from 'react';
import { Info, ShieldAlert, Sparkles, Terminal } from 'lucide-react';

export const DemoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-amber-500/15 via-cyan-500/10 to-indigo-500/15 border-b border-amber-500/30 px-4 py-2 text-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-300">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-bold tracking-wide uppercase text-[11px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
            DEMO MODE
          </span>
          <span className="text-slate-200 font-medium hidden sm:inline">
            DATA IS SIMULATED FOR PROTOTYPE DEMONSTRATION & SIH PRESENTATION
          </span>
          <span className="text-slate-200 font-medium sm:hidden">
            SIMULATED DEMO DATA
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <div className="hidden md:flex items-center gap-1.5 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Multi-Source Weather Verification Engine Active</span>
          </div>
          <span className="bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
            v2.4-SIH.PROTOTYPE
          </span>
        </div>
      </div>
    </div>
  );
};
