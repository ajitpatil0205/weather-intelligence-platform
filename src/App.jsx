import React, { useState, useEffect } from 'react';
import { DemoBanner } from './components/layout/DemoBanner';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { EventDetailModal } from './components/common/EventDetailModal';
import { MapKeyModal } from './components/common/MapKeyModal';

// Views
import { DashboardView } from './components/views/DashboardView';
import { LiveMapView } from './components/views/LiveMapView';
import { EventsView } from './components/views/EventsView';
import { VerificationCenterView } from './components/views/VerificationCenterView';
import { DuplicateDetectionView } from './components/views/DuplicateDetectionView';
import { ProactiveAlertsView } from './components/views/ProactiveAlertsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { AdminPanelView } from './components/views/AdminPanelView';
import { SourcesView } from './components/views/SourcesView';
import { ArchitectureView } from './components/views/ArchitectureView';

// Data
import { MOCK_WEATHER_EVENTS } from './data/mockEvents';
import { MOCK_ALERTS } from './data/mockAlerts';

export function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState(MOCK_WEATHER_EVENTS);
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isMapKeyModalOpen, setIsMapKeyModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Map Provider & API Key State
  const [mapConfig, setMapConfig] = useState(() => {
    try {
      const saved = localStorage.getItem("weather_intel_map_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.providerId === "carto-dark" && !parsed.cartoKey) {
          parsed.providerId = "esri-dark";
        }
        return parsed;
      }
    } catch (e) {
      // ignore
    }
    return {
      providerId: "esri-dark",
      cartoKey: "",
      mapboxKey: "",
      maptilerKey: "",
      stadiaKey: "",
      owmKey: "",
      showRadarOverlay: false
    };
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveMapConfig = (newConfig) => {
    setMapConfig(newConfig);
    try {
      localStorage.setItem("weather_intel_map_config", JSON.stringify(newConfig));
    } catch (e) {
      // ignore
    }
    showToast("Map configuration & API keys updated!");
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEventModalOpen(false);
  };

  const handleNavigateToMap = (event) => {
    setSelectedEvent(event);
    setActiveTab("map");
  };

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isAcknowledged: true } : a));
    showToast(`Alert ${alertId} acknowledged and logged.`);
  };

  const handleTriggerAlert = (event) => {
    const newAlert = {
      id: `ALT-${Math.floor(830 + Math.random() * 50)}`,
      title: `${event.eventType} Emergency Alert`,
      eventType: event.eventType,
      location: `${event.location}, ${event.state}`,
      region: `${event.location} & surrounding talukas`,
      severity: event.severity,
      truthScore: event.truthScore,
      time: "Just now",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourcesCount: event.reportsCount || 4,
      status: "ACTIVE",
      affectedArea: `${event.location} Area (Radius: 15 km)`,
      affectedPopulation: event.affectedPopulation || "~100,000 residents",
      recommendedAction: event.recommendedAction || "Monitor official weather updates and avoid vulnerable areas.",
      broadcastStatus: "DISPATCHED",
      isAcknowledged: false,
      eventId: event.id
    };

    setAlerts([newAlert, ...alerts]);
    showToast(`Proactive CAP Alert broadcasted for ${event.location}!`);
  };

  const handleGlobalSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 1 && activeTab !== "events" && activeTab !== "map") {
      setActiveTab("events");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Top Prominent SIH Demo Mode Banner */}
      <DemoBanner />

      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearch={handleGlobalSearch}
        alerts={alerts}
        onSelectAlert={(alert) => {
          const matchedEvt = events.find(e => e.id === alert.eventId || e.location.includes(alert.location.split(",")[0]));
          if (matchedEvt) {
            handleSelectEvent(matchedEvt);
          } else {
            setActiveTab("alerts");
          }
        }}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        totalEventsCount={events.length}
        onOpenMapKeyModal={() => setIsMapKeyModalOpen(true)}
        mapConfig={mapConfig}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          activeAlertsCount={alerts.filter(a => a.status === "ACTIVE").length}
          verifiedEventsCount={events.filter(e => e.verificationStatus === "VERIFIED").length}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950/50">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {activeTab === "dashboard" && (
              <DashboardView
                events={events}
                alerts={alerts}
                onSelectEvent={handleSelectEvent}
                onNavigateToTab={setActiveTab}
                onAcknowledgeAlert={handleAcknowledgeAlert}
                mapConfig={mapConfig}
              />
            )}

            {activeTab === "map" && (
              <LiveMapView
                events={events}
                selectedEvent={selectedEvent}
                onSelectEvent={handleSelectEvent}
                mapConfig={mapConfig}
                onOpenMapKeyModal={() => setIsMapKeyModalOpen(true)}
              />
            )}

            {activeTab === "events" && (
              <EventsView
                events={events}
                onSelectEvent={handleSelectEvent}
                onTriggerAlert={handleTriggerAlert}
              />
            )}

            {activeTab === "verification" && (
              <VerificationCenterView
                events={events}
                onSelectEvent={handleSelectEvent}
              />
            )}

            {activeTab === "duplicates" && (
              <DuplicateDetectionView />
            )}

            {activeTab === "alerts" && (
              <ProactiveAlertsView
                alerts={alerts}
                events={events}
                onSelectEvent={handleSelectEvent}
                onNavigateToMap={handleNavigateToMap}
                onAcknowledgeAlert={handleAcknowledgeAlert}
              />
            )}

            {activeTab === "analytics" && (
              <AnalyticsView />
            )}

            {activeTab === "admin" && (
              <AdminPanelView />
            )}

            {activeTab === "sources" && (
              <SourcesView />
            )}

            {activeTab === "architecture" && (
              <ArchitectureView />
            )}

          </div>
        </main>
      </div>

      {/* Event Detail Inspection Modal / Dossier */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isEventModalOpen}
        onClose={handleCloseModal}
        onNavigateToMap={handleNavigateToMap}
        onTriggerAlert={handleTriggerAlert}
      />

      {/* Map Tile & API Key Settings Modal */}
      <MapKeyModal
        isOpen={isMapKeyModalOpen}
        onClose={() => setIsMapKeyModalOpen(false)}
        mapConfig={mapConfig}
        onSaveConfig={handleSaveMapConfig}
      />

      {/* Floating Interactive Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-cyan-950 border border-cyan-500 shadow-2xl text-cyan-200 font-bold text-xs flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          {toastMessage}
        </div>
      )}

    </div>
  );
}

export default App;
