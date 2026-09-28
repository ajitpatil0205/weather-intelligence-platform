import React, { useState, useEffect } from 'react';
import { 
  Key, 
  X, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Info, 
  Lock, 
  CloudRain, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export const MAP_PROVIDERS = [
  {
    id: "esri-dark",
    name: "Esri World Dark Gray (Command Center Base)",
    requiresKey: false,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ & National Weather Intelligence',
    description: "Official meteorological command-center dark canvas. 100% Free & No watermark."
  },
  {
    id: "osm",
    name: "OpenStreetMap Standard (Full Road Network)",
    requiresKey: false,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    description: "Standard detailed open street map with complete Indian road networks and boundaries."
  },
  {
    id: "esri-satellite",
    name: "Esri World Imagery (High-Res Satellite)",
    requiresKey: false,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, GeoEye',
    description: "High-resolution satellite terrain imagery with natural cloud and elevation views."
  },
  {
    id: "esri-topo",
    name: "Esri World Topographic Map",
    requiresKey: false,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, DeLorme, NAVTEQ',
    description: "Topographic elevation contours and shaded relief."
  },
  {
    id: "carto-dark",
    name: "CartoDB Dark Matter (API Key Required)",
    requiresKey: true,
    keyType: "carto",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?api_key={API_KEY}",
    attribution: '&copy; <a href="https://carto.com/">CartoDB</a> Dark Matter',
    description: "CartoDB dark tiles (requires Carto API key from carto.com)."
  },
  {
    id: "mapbox-dark",
    name: "Mapbox Dark v11",
    requiresKey: true,
    keyType: "mapbox",
    url: "https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token={API_KEY}",
    attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    description: "High-precision vector dark tiles from Mapbox (Requires public token pk.eyJ...)."
  },
  {
    id: "mapbox-satellite",
    name: "Mapbox Satellite Streets",
    requiresKey: true,
    keyType: "mapbox",
    url: "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token={API_KEY}",
    attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    description: "High-resolution satellite imagery with street & border overlays."
  },
  {
    id: "maptiler-dark",
    name: "MapTiler Dark / Dataviz",
    requiresKey: true,
    keyType: "maptiler",
    url: "https://api.maptiler.com/maps/dataviz-dark/{z}/{x}/{y}.png?key={API_KEY}",
    attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; OpenStreetMap',
    description: "Specialized data-visualization cartography from MapTiler."
  },
  {
    id: "stadia-dark",
    name: "Stadia Alidade Smooth Dark",
    requiresKey: true,
    keyType: "stadia",
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key={API_KEY}",
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
    description: "Ultra-clean minimalist dark tiles for meteorological command centers."
  }
];

export const MapKeyModal = ({ 
  isOpen, 
  onClose, 
  mapConfig, 
  onSaveConfig 
}) => {
  const [selectedProviderId, setSelectedProviderId] = useState(mapConfig?.providerId || "esri-dark");
  const [cartoKey, setCartoKey] = useState(mapConfig?.cartoKey || "");
  const [mapboxKey, setMapboxKey] = useState(mapConfig?.mapboxKey || "");
  const [maptilerKey, setMaptilerKey] = useState(mapConfig?.maptilerKey || "");
  const [stadiaKey, setStadiaKey] = useState(mapConfig?.stadiaKey || "");
  const [owmKey, setOwmKey] = useState(mapConfig?.owmKey || "");
  const [showRadarOverlay, setShowRadarOverlay] = useState(mapConfig?.showRadarOverlay || false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  useEffect(() => {
    if (mapConfig) {
      // If previously set to carto-dark with no key, migrate smoothly to esri-dark
      const currentProv = mapConfig.providerId === "carto-dark" && !mapConfig.cartoKey ? "esri-dark" : (mapConfig.providerId || "esri-dark");
      setSelectedProviderId(currentProv);
      setCartoKey(mapConfig.cartoKey || "");
      setMapboxKey(mapConfig.mapboxKey || "");
      setMaptilerKey(mapConfig.maptilerKey || "");
      setStadiaKey(mapConfig.stadiaKey || "");
      setOwmKey(mapConfig.owmKey || "");
      setShowRadarOverlay(mapConfig.showRadarOverlay || false);
    }
  }, [mapConfig]);

  if (!isOpen) return null;

  const currentProvider = MAP_PROVIDERS.find(p => p.id === selectedProviderId) || MAP_PROVIDERS[0];

  const handleSave = () => {
    onSaveConfig({
      providerId: selectedProviderId,
      cartoKey,
      mapboxKey,
      maptilerKey,
      stadiaKey,
      owmKey,
      showRadarOverlay
    });
    setSaveFeedback(true);
    setTimeout(() => {
      setSaveFeedback(false);
      onClose();
    }, 800);
  };

  const handleLoadDemoKey = () => {
    setCartoKey("default_public_carto_key");
    setMapboxKey("pk.eyJ1Ijoic2loLWRlbW8iLCJhIjoiY2x6eXg0OTAyMGJqcTJrcXZ6a20yYjZ1NSJ9.demo_token");
    setMaptilerKey("demo_maptiler_key_weather");
    setStadiaKey("demo_stadia_key_weather");
    setOwmKey("demo_owm_api_key");
  };

  const handleResetToFree = () => {
    setSelectedProviderId("esri-dark");
    setShowRadarOverlay(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden my-8">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Map Tile & API Key Configuration
              </h2>
              <p className="text-xs text-slate-400">
                Choose clean watermark-free basemaps or configure custom Mapbox / Carto / OWM API keys
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Provider Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Select Geographic Basemap Provider:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MAP_PROVIDERS.map((provider) => {
                const isSelected = provider.id === selectedProviderId;
                return (
                  <div
                    key={provider.id}
                    onClick={() => setSelectedProviderId(provider.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/10"
                        : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{provider.name}</span>
                      {provider.requiresKey ? (
                        <span className="text-[9px] font-bold text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800/40">
                          Key Needed
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800/40">
                          100% Free / No Key
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {provider.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* API Key Input Fields */}
          <div className="space-y-3.5 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                Custom Map Service Credentials (Optional):
              </span>
              <button
                type="button"
                onClick={handleLoadDemoKey}
                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Load Sample Demo Keys
              </button>
            </div>

            {/* CartoDB API Key */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <label className="text-slate-300 font-semibold">CartoDB API Key</label>
                <span className="text-[10px] text-slate-400 font-mono">carto.com/basemaps/apikey</span>
              </div>
              <input
                type="password"
                value={cartoKey}
                onChange={(e) => setCartoKey(e.target.value)}
                placeholder="Enter CartoDB API key (e.g. 5a1b2c3d...)"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
              />
            </div>

            {/* Mapbox Token */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <label className="text-slate-300 font-semibold">Mapbox Access Token (pk.xxx)</label>
                <span className="text-[10px] text-slate-400 font-mono">mapbox.com</span>
              </div>
              <input
                type="password"
                value={mapboxKey}
                onChange={(e) => setMapboxKey(e.target.value)}
                placeholder="Enter Mapbox public token (e.g. pk.eyJ1Ijoi...)"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
              />
            </div>

            {/* MapTiler Key */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <label className="text-slate-300 font-semibold">MapTiler API Key</label>
                <span className="text-[10px] text-slate-400 font-mono">maptiler.com</span>
              </div>
              <input
                type="password"
                value={maptilerKey}
                onChange={(e) => setMaptilerKey(e.target.value)}
                placeholder="Enter MapTiler key..."
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
              />
            </div>

            {/* OpenWeatherMap Radar Overlay Key */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <label className="text-slate-300 font-semibold flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                  OpenWeatherMap Precipitation Radar Key
                </label>
                <span className="text-[10px] text-slate-400 font-mono">openweathermap.org</span>
              </div>
              <input
                type="password"
                value={owmKey}
                onChange={(e) => setOwmKey(e.target.value)}
                placeholder="Enter OpenWeatherMap API key for live precipitation radar tile overlay..."
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
              />
            </div>
          </div>

          {/* OpenWeatherMap Radar Layer Toggle */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                Live Precipitation & Weather Radar Tile Overlay
              </span>
              <p className="text-[11px] text-slate-300">
                Overlays live meteorological precipitation radar tiles over the chosen basemap.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowRadarOverlay(!showRadarOverlay)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                showRadarOverlay
                  ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
            >
              {showRadarOverlay ? "Layer Enabled" : "Layer Disabled"}
            </button>
          </div>

          {/* Info Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              By default, the platform uses <strong>Esri World Dark Gray Base & OpenStreetMap</strong>, which are 100% free, fast, and require no API key or watermark.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-950/90 border-t border-slate-800">
          <button
            type="button"
            onClick={handleResetToFree}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Use Default Free Dark Canvas
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              {saveFeedback ? "Configuration Saved!" : "Apply Map Settings"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
