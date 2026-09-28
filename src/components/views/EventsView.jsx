import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ShieldCheck, 
  Eye, 
  Send, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  MapPin,
  Clock,
  RotateCcw
} from 'lucide-react';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { WeatherIcon } from '../common/WeatherIcon';
import { WEATHER_TYPES } from '../../data/weatherTypes';

export const EventsView = ({ events = [], onSelectEvent, onTriggerAlert }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("truthScore"); // truthScore, time, severity, reports
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredAndSortedEvents = useMemo(() => {
    let result = events.filter((evt) => {
      if (severityFilter !== "ALL" && evt.severity !== severityFilter) return false;
      if (statusFilter !== "ALL" && evt.verificationStatus !== statusFilter) return false;
      if (typeFilter !== "ALL" && evt.eventType.toLowerCase() !== typeFilter.toLowerCase()) return false;
      
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const match = evt.id.toLowerCase().includes(q) ||
                      evt.location.toLowerCase().includes(q) ||
                      evt.state.toLowerCase().includes(q) ||
                      evt.eventType.toLowerCase().includes(q) ||
                      evt.source.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === "severity") {
        const weight = { "HIGH": 3, "MEDIUM": 2, "LOW": 1 };
        valA = weight[a.severity] || 0;
        valB = weight[b.severity] || 0;
      } else if (sortBy === "reports") {
        valA = a.reportsCount;
        valB = b.reportsCount;
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [events, searchTerm, severityFilter, statusFilter, typeFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedEvents.length / pageSize) || 1;
  const paginatedEvents = filteredAndSortedEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSeverityFilter("ALL");
    setStatusFilter("ALL");
    setTypeFilter("ALL");
    setSortBy("truthScore");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* Top Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              National Weather Event Management Registry
            </h2>
            <p className="text-xs text-slate-400">
              Showing {filteredAndSortedEvents.length} records • Multi-sensor ingested telemetry
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search event ID, city, state..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Event Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Event Classifications</option>
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
              value={severityFilter}
              onChange={(e) => {
                setSeverityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Severities</option>
              <option value="HIGH">High Severity</option>
              <option value="MEDIUM">Medium Severity</option>
              <option value="LOW">Low Severity</option>
            </select>
          </div>

          {/* Verification Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Verification Levels</option>
              <option value="VERIFIED">Verified (&ge;80% Truth)</option>
              <option value="REVIEW">Under Review (50-79%)</option>
              <option value="UNVERIFIED">Unverified (&lt;50%)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3.5 font-bold cursor-pointer hover:text-white" onClick={() => handleSort("id")}>
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3 text-cyan-400" />
                  </div>
                </th>
                <th className="px-4 py-3.5 font-bold cursor-pointer hover:text-white" onClick={() => handleSort("eventType")}>
                  <div className="flex items-center gap-1">
                    <span>Event Type</span>
                    <ArrowUpDown className="w-3 h-3 text-cyan-400" />
                  </div>
                </th>
                <th className="px-4 py-3.5 font-bold cursor-pointer hover:text-white" onClick={() => handleSort("location")}>
                  <div className="flex items-center gap-1">
                    <span>Location</span>
                    <ArrowUpDown className="w-3 h-3 text-cyan-400" />
                  </div>
                </th>
                <th className="px-4 py-3.5 font-bold cursor-pointer hover:text-white" onClick={() => handleSort("state")}>
                  <span>State</span>
                </th>
                <th className="px-4 py-3.5 font-bold cursor-pointer hover:text-white" onClick={() => handleSort("severity")}>
                  <div className="flex items-center gap-1">
                    <span>Severity</span>
                    <ArrowUpDown className="w-3 h-3 text-cyan-400" />
                  </div>
                </th>
                <th className="px-4 py-3.5 font-bold cursor-pointer hover:text-white" onClick={() => handleSort("truthScore")}>
                  <div className="flex items-center gap-1">
                    <span>Truth Score</span>
                    <ArrowUpDown className="w-3 h-3 text-cyan-400" />
                  </div>
                </th>
                <th className="px-4 py-3.5 font-bold">
                  <span>Verification</span>
                </th>
                <th className="px-4 py-3.5 font-bold">
                  <span>Primary Ingest</span>
                </th>
                <th className="px-4 py-3.5 font-bold cursor-pointer hover:text-white" onClick={() => handleSort("reports")}>
                  <div className="flex items-center gap-1">
                    <span>Reports</span>
                    <ArrowUpDown className="w-3 h-3 text-cyan-400" />
                  </div>
                </th>
                <th className="px-4 py-3.5 font-bold">
                  <span>Time</span>
                </th>
                <th className="px-4 py-3.5 font-bold text-right">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedEvents.length > 0 ? (
                paginatedEvents.map((evt) => (
                  <tr
                    key={evt.id}
                    onClick={() => onSelectEvent && onSelectEvent(evt)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors group"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400">
                      {evt.id}
                    </td>
                    <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                      <WeatherIcon type={evt.eventType} className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{evt.eventType}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-100">
                      {evt.location}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {evt.state}
                    </td>
                    <td className="px-4 py-3">
                      <SeverityBadge severity={evt.severity} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold ${
                          evt.truthScore >= 80 ? 'text-emerald-400' : evt.truthScore >= 50 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {evt.truthScore}%
                        </span>
                        <div className="w-10 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${
                              evt.truthScore >= 80 ? 'bg-emerald-400' : evt.truthScore >= 50 ? 'bg-amber-400' : 'bg-red-400'
                            }`}
                            style={{ width: `${evt.truthScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={evt.verificationStatus} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-slate-300 truncate max-w-[130px]" title={evt.primarySource || evt.source}>
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
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onSelectEvent && onSelectEvent(evt)}
                          className="px-2.5 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 font-bold border border-cyan-500/30 transition-all text-xs"
                          title="View Event Dossier"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onTriggerAlert && onTriggerAlert(evt)}
                          className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold border border-red-500/30 transition-all text-xs"
                          title="Broadcast Alert"
                        >
                          Alert
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-6 py-12 text-center text-slate-400">
                    No matching weather events found for current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-400">
          <div>
            Showing {Math.min(filteredAndSortedEvents.length, (currentPage - 1) * pageSize + 1)} to {Math.min(filteredAndSortedEvents.length, currentPage * pageSize)} of {filteredAndSortedEvents.length} events
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 border border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 font-mono font-bold text-white bg-slate-800 rounded-lg border border-slate-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 border border-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
