import React, { useState } from 'react';
import { 
  CopyCheck, 
  Layers, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Search,
  Zap
} from 'lucide-react';
import { MOCK_DUPLICATE_CLUSTERS } from '../../data/mockDuplicates';

export const DuplicateDetectionView = () => {
  const [activeClusterId, setActiveClusterId] = useState("DUP-CLU-101");
  const [customTextA, setCustomTextA] = useState("Heavy rainfall causing waterlogging on Pune Sinhagad Road underpass");
  const [customTextB, setCustomTextB] = useState("Pune experiencing severe flooding after heavy rain near Sinhagad Rd");
  const [customDistance, setCustomDistance] = useState(0.8);
  const [testedSimilarity, setTestedSimilarity] = useState(84);

  const selectedCluster = MOCK_DUPLICATE_CLUSTERS.find(c => c.clusterId === activeClusterId) || MOCK_DUPLICATE_CLUSTERS[0];

  // Quick word token similarity simulation
  const handleTestSimilarity = () => {
    const wordsA = new Set(customTextA.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    const wordsB = new Set(customTextB.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    
    let common = 0;
    wordsA.forEach(w => {
      if (wordsB.has(w)) common++;
    });

    const union = new Set([...wordsA, ...wordsB]);
    const jaccard = union.size > 0 ? (common / union.size) : 0;
    // Map to realistic semantic similarity
    const score = Math.min(96, Math.max(35, Math.round(jaccard * 100 + 35)));
    setTestedSimilarity(score);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <CopyCheck className="w-6 h-6" />
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                AI Duplicate Report Detection & Spatiotemporal Clustering
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              When extreme weather strikes an urban center, hundreds of citizen posts, sensor warnings, and news alerts flood in simultaneously.
              Our engine detects duplicate reports using NLP text similarity, geospatial distance thresholds (&le; 2.5 km), and temporal overlap (15-min window), 
              grouping them into high-confidence canonical weather events while keeping all individual telemetry records intact.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Ingest Reduction Ratio</span>
            <span className="text-xl font-black text-cyan-400">4.2 : 1</span>
            <span className="text-[10px] text-emerald-400 block font-medium">De-duplicated cleanly</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Cluster Scenarios & Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (4 cols): Cluster Scenario Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Deduplication Scenarios
            </h3>

            <div className="space-y-3">
              {MOCK_DUPLICATE_CLUSTERS.map((cluster) => {
                const isSelected = cluster.clusterId === activeClusterId;
                return (
                  <div
                    key={cluster.clusterId}
                    onClick={() => setActiveClusterId(cluster.clusterId)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-950/30 border-indigo-500 shadow-lg shadow-indigo-500/10"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/40">
                        {cluster.clusterId}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400">
                        {cluster.similarityScore}% Match
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug mb-1">
                      {cluster.targetEvent}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                      <span>{cluster.location}</span>
                      <span className="font-semibold text-slate-200">{cluster.totalReportsMerged} Ingests Merged</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col (8 cols): Selected Cluster Side-by-Side Breakdown */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
            
            {/* Cluster Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                  Canonical Target: {selectedCluster.canonicalEventId}
                </span>
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  {selectedCluster.targetEvent}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {selectedCluster.resultVerdict}
                </span>
              </div>
            </div>

            {/* SIH Requirement Note Box */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-200/90 leading-relaxed flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-indigo-200 block mb-0.5">Deduplication & Truth Verification Policy:</strong>
                "{selectedCluster.deduplicationRationale}"
              </div>
            </div>

            {/* Individual Ingested Reports In This Cluster */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Cluster Ingestion Trace ({selectedCluster.reports.length} Reports Aggregated)</span>
                <span className="text-[10px] text-slate-400 font-mono">Max Geo-Offset: {selectedCluster.maxDistanceKm} km</span>
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {selectedCluster.reports.map((rep, idx) => (
                  <div
                    key={rep.reportId}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                          {rep.reportId}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {rep.author} ({rep.source})
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="text-slate-400">Offset: <strong className="text-slate-200">{rep.geoOffset}</strong></span>
                        <span className="text-slate-400">Time: <strong className="text-slate-200">{rep.timestamp}</strong></span>
                        <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          {rep.similarityToPrimary}% Sim
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      "{rep.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive NLP Similarity Tester Sandbox */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Live NLP Report Similarity & Distance Sandbox
                </h3>
                <p className="text-[11px] text-slate-400">
                  Type two report snippets to test how the deduplication algorithm scores text similarity & distance
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">Report A (Primary Reference)</label>
                <textarea
                  rows={2}
                  value={customTextA}
                  onChange={(e) => setCustomTextA(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">Report B (Incoming Candidate)</label>
                <textarea
                  rows={2}
                  value={customTextB}
                  onChange={(e) => setCustomTextB(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <label className="text-xs text-slate-300">Spatial Distance:</label>
                <input
                  type="range"
                  min="0.1"
                  max="15.0"
                  step="0.1"
                  value={customDistance}
                  onChange={(e) => setCustomDistance(Number(e.target.value))}
                  className="w-32 accent-cyan-400"
                />
                <span className="text-xs font-mono font-bold text-cyan-400">{customDistance} km</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleTestSimilarity}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Evaluate Similarity
                </button>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold">
                  <span className="text-slate-400">Similarity:</span>
                  <span className={`font-mono ${testedSimilarity >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {testedSimilarity}%
                  </span>
                  <span className="text-[10px] text-slate-400">
                    ({testedSimilarity >= 75 && customDistance <= 2.5 ? "MERGE CANDIDATE" : "INDEPENDENT EVENT"})
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
