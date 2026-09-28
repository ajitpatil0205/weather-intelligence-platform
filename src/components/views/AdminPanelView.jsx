import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  Hash, 
  Filter, 
  Search, 
  Calendar, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  Download, 
  Database, 
  Cpu, 
  Image as ImageIcon, 
  Video, 
  Sparkles, 
  Terminal, 
  Send,
  RotateCcw,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { MOCK_HASHTAG_FEEDS, MOCK_SOCIAL_POSTS } from '../../data/mockSocialStream';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { WeatherIcon } from '../common/WeatherIcon';
import { formatCoordinates } from '../../utils/formatters';

export const AdminPanelView = () => {
  const [posts, setPosts] = useState(MOCK_SOCIAL_POSTS);
  const [selectedHashtag, setSelectedHashtag] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [eventFilter, setEventFilter] = useState("ALL");
  const [locationFilter, setLocationFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [adminNotice, setAdminNotice] = useState(null);

  const showFeedback = (msg) => {
    setAdminNotice(msg);
    setTimeout(() => setAdminNotice(null), 3500);
  };

  // Filtered dataset
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedHashtag !== "ALL" && !post.hashtags.includes(selectedHashtag)) return false;
      if (dateFilter !== "ALL" && post.date !== dateFilter) return false;
      if (eventFilter !== "ALL" && post.eventCategory !== eventFilter) return false;
      if (locationFilter !== "ALL" && !post.city.toLowerCase().includes(locationFilter.toLowerCase()) && !post.state.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      if (statusFilter !== "ALL" && post.adminStatus !== statusFilter) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match = post.content.toLowerCase().includes(q) ||
                      post.author.toLowerCase().includes(q) ||
                      post.city.toLowerCase().includes(q) ||
                      post.hashtags.some(h => h.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [posts, selectedHashtag, dateFilter, eventFilter, locationFilter, statusFilter, searchQuery]);

  // Admin Actions
  const handleApprove = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, adminStatus: "APPROVED", truthScore: Math.max(88, p.truthScore) } : p));
    showFeedback(`Report ${id} approved & ingested into Central National Weather DB.`);
  };

  const handleQuarantine = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, adminStatus: "QUARANTINED", truthScore: Math.min(30, p.truthScore) } : p));
    showFeedback(`Report ${id} quarantined as Misleading / Fake News Rumor.`);
  };

  const handleResetFilters = () => {
    setSelectedHashtag("ALL");
    setDateFilter("ALL");
    setEventFilter("ALL");
    setLocationFilter("ALL");
    setStatusFilter("ALL");
    setSearchQuery("");
  };

  // Export Data Simulator
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Date,Time,City,State,Latitude,Longitude,Event,Hashtags,Author,FakeScore,Status,Content\n" +
      filteredPosts.map(e => `"${e.id}","${e.date}","${e.timestamp}","${e.city}","${e.state}",${e.latitude},${e.longitude},"${e.eventCategory}","${e.hashtags.join(' ')}","${e.author}",${e.aiAnalysis.fakeProbability}%,"${e.adminStatus}","${e.content.replace(/"/g, '""')}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `national_weather_intel_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback("Centralized dataset exported as CSV.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner: Big Data Harvester & Admin Control Room */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Database className="w-6 h-6" />
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                National Weather Big Data Harvester & Admin Control Panel
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Automated ingestion pipeline collecting real-time social media posts tagged with <strong className="text-cyan-300">#IMD</strong> and regional weather hashtags.
              Features AI-based fake report identification, image EXIF reverse validation, multi-dimensional filtering, and centralized DB storage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-slate-700 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              Export Central DB (CSV)
            </button>
          </div>
        </div>

        {/* Live Hashtag Stream Strip */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-cyan-400" />
              Live Ingested Weather Hashtag Frequency Monitor (#IMD Harvester)
            </span>
            <span className="text-[10px] text-cyan-400 font-mono font-bold">58,000+ Posts / Hour</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedHashtag("ALL")}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedHashtag === "ALL"
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/20"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              All Hashtags
            </button>

            {MOCK_HASHTAG_FEEDS.map((feed) => (
              <button
                key={feed.hashtag}
                onClick={() => setSelectedHashtag(feed.hashtag)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  selectedHashtag === feed.hashtag
                    ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20"
                    : "bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
                }`}
              >
                <span>{feed.hashtag}</span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-1.5 py-0.2 rounded">
                  {feed.count}
                </span>
                <span className="text-[9px] text-emerald-400 font-mono">{feed.trend}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Admin Feedback Toast */}
      {adminNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          {adminNotice}
        </div>
      )}

      {/* Multi-Dimensional Filter Control Room */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Central Intelligence Multi-Filter Console
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              Showing <strong className="text-cyan-400 font-mono">{filteredPosts.length}</strong> matching records
            </span>
            <button
              onClick={handleResetFilters}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Reset All Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Core Filters Required by SIH: Date-wise, Event-wise, Location-wise, Verification Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* 1. Date-wise Filtering */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              1. Date-wise Filter
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Available Dates</option>
              <option value="2026-09-28">Today (2026-09-28)</option>
              <option value="2026-09-27">Yesterday (2026-09-27)</option>
              <option value="2026-09-26">26 Sep 2026</option>
            </select>
          </div>

          {/* 2. Event-wise Filtering */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              2. Event-wise Filter
            </label>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Event Categories</option>
              <option value="Heavy Rainfall">Heavy Rainfall</option>
              <option value="Flooding">Flooding</option>
              <option value="Thunderstorm">Thunderstorm</option>
              <option value="Cyclone">Cyclone</option>
              <option value="Fog">Fog</option>
              <option value="Dust Storm">Dust Storm</option>
              <option value="Heatwave">Heatwave</option>
              <option value="Lightning">Lightning</option>
            </select>
          </div>

          {/* 3. Location-wise Filtering */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              3. Location-wise Filter
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Cities & States (India)</option>
              <option value="Mumbai">Mumbai, Maharashtra</option>
              <option value="Pune">Pune, Maharashtra</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Bengaluru">Bengaluru, Karnataka</option>
              <option value="Patna">Patna, Bihar</option>
              <option value="Jaipur">Jaipur, Rajasthan</option>
              <option value="Chennai">Chennai, Tamil Nadu</option>
              <option value="Kolkata">Kolkata, West Bengal</option>
            </select>
          </div>

          {/* 4. Verification Status Tracking */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              4. Verification Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Verification Statuses</option>
              <option value="APPROVED">Approved to Central DB</option>
              <option value="UNDER_REVIEW">Under Review / Human Triage</option>
              <option value="QUARANTINED">Quarantined Fake / Misleading</option>
            </select>
          </div>

        </div>

        {/* Universal Search in Post Text / Author */}
        <div className="relative pt-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within social post content, username, coordinates, or city..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Main Content Grid: Ingested Posts with AI Fake Detection Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Ingested Posts Stream */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                const isFake = post.aiAnalysis.fakeProbability > 50;
                const isUnderReview = post.adminStatus === "UNDER_REVIEW";

                return (
                  <div
                    key={post.id}
                    className={`p-5 rounded-3xl bg-slate-900/90 border transition-all shadow-xl space-y-3 ${
                      isFake
                        ? "border-red-500/40 bg-gradient-to-br from-red-950/20 via-slate-900 to-slate-900"
                        : post.adminStatus === "APPROVED"
                        ? "border-slate-800 hover:border-emerald-500/40"
                        : "border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900"
                    }`}
                  >
                    {/* Post Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400">
                          <WeatherIcon type={post.eventCategory} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-white">{post.author}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({post.platform})</span>
                            <span className="text-[10px] text-slate-400">• {post.authorFollowers} followers</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            <span>{post.city}, {post.state}</span>
                            <span>•</span>
                            <span className="font-mono text-slate-300">{formatCoordinates(post.latitude, post.longitude)}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      {/* Admin Status Badge */}
                      <div className="flex items-center gap-2">
                        {post.adminStatus === "APPROVED" && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Central DB Approved
                          </span>
                        )}
                        {post.adminStatus === "QUARANTINED" && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Fake / Quarantined
                          </span>
                        )}
                        {post.adminStatus === "UNDER_REVIEW" && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Review Required
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Post Body & Hashtags */}
                    <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                      {post.content}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {post.hashtags.map((h, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* AI Verification & Misleading Report Analysis */}
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-300 uppercase text-[10px] flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          AI Multimodal & NLP Verification Insight:
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            post.aiAnalysis.fakeProbability > 50 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}>
                            Fake Probability: {post.aiAnalysis.fakeProbability}%
                          </span>
                          <span className="text-[10px] font-mono font-bold text-cyan-400">
                            Truth: {post.truthScore}%
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        <strong className="text-slate-300">EXIF / Image Match:</strong> {post.aiAnalysis.imageReverseMatch}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                        <span className="text-slate-400">NLP Urgency: <strong className="text-slate-200">{post.aiAnalysis.nlpUrgencyScore}/100</strong></span>
                        <span className="text-slate-400">Spam/Bot Probability: <strong className="text-slate-200">{post.aiAnalysis.botScore}%</strong></span>
                      </div>
                    </div>

                    {/* Admin Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold border border-slate-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Inspect Schema JSON
                      </button>

                      <div className="flex items-center gap-2">
                        {post.adminStatus !== "QUARANTINED" && (
                          <button
                            onClick={() => handleQuarantine(post.id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-bold border border-red-500/30 transition-all"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Quarantine Fake Report
                          </button>
                        )}

                        {post.adminStatus !== "APPROVED" && (
                          <button
                            onClick={() => handleApprove(post.id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 text-xs font-bold border border-emerald-500/30 transition-all"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Approve to Central DB
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center text-slate-400 rounded-3xl bg-slate-900 border border-slate-800">
                No reports match the current filter criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Big Data Pipeline & Schema Summary */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Central DB Ingestion Pipeline Card */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Central Database Storage Specs
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300">
                Table: <code>weather_geotagged_telemetry</code>
                <br />
                Engine: <code>PostgreSQL 16 + PostGIS 3.4</code>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                Stores all raw posts with spatial coordinates (<strong className="text-cyan-300">POINT(lat, lng)</strong>), EXIF hashes, NLP entity embeddings, and ISO-8601 timestamps.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Kafka Topic:</span>
                  <span className="font-mono text-white">weather.raw.social</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Throughput:</span>
                  <span className="font-mono text-emerald-400">14,200 msg/sec</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Fake Filter Accuracy:</span>
                  <span className="font-mono text-cyan-400">97.8% Precision</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Fake News Guidelines */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              AI Fake News Detection Rules
            </h3>

            <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed">
              <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-800/40">
                <strong className="text-red-300 block mb-0.5">1. Recycled Media Detector:</strong>
                Performs reverse perceptual hashing against historical disaster image archives to identify reused photos.
              </div>

              <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-800/40">
                <strong className="text-amber-300 block mb-0.5">2. NLP Sensor Corroborator:</strong>
                Cross-references user claims against closest IMD Doppler radar reflectivity within 10 km radius.
              </div>

              <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
                <strong className="text-cyan-300 block mb-0.5">3. Bot & Spam Filter:</strong>
                Flags newly created accounts broadcasting duplicate sensational captions without geotag consistency.
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* JSON Schema Inspection Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Central Database Telemetry Schema ({selectedPost.id})</h3>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 max-h-[65vh] overflow-y-auto">
              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs leading-relaxed overflow-x-auto">
                {JSON.stringify(selectedPost, null, 2)}
              </pre>
            </div>

            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-right">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
