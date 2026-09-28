import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  ShieldCheck, 
  Clock, 
  Radio, 
  Eye, 
  Layers, 
  ExternalLink, 
  Compass,
  AlertOctagon,
  Flame,
  CloudRain
} from 'lucide-react';
import { SeverityBadge } from './SeverityBadge';
import { StatusBadge } from './StatusBadge';
import { WeatherIcon } from './WeatherIcon';
import { formatCoordinates } from '../../utils/formatters';
import { MAP_PROVIDERS } from './MapKeyModal';

// Custom Map Controller to handle pan/zoom programmatically
const MapFlyTo = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
      map.flyTo(center, zoom, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [center, zoom, map]);
  return null;
};

// Create custom colored radar markers with HTML / CSS
const createCustomMarker = (event) => {
  const severity = (event.severity || "LOW").toUpperCase();
  let bgGradient = "from-sky-500 to-blue-600 shadow-sky-500/50";
  let ringClass = "border-sky-400";
  let pulseClass = "";

  if (severity === "HIGH") {
    bgGradient = "from-red-500 to-rose-700 shadow-red-500/50";
    ringClass = "border-red-400";
    pulseClass = "radar-pulse-high";
  } else if (severity === "MEDIUM") {
    bgGradient = "from-amber-500 to-orange-600 shadow-amber-500/50";
    ringClass = "border-amber-400";
    pulseClass = "radar-pulse-med";
  }

  const html = `
    <div class="relative flex items-center justify-center custom-map-marker">
      <div class="absolute w-8 h-8 rounded-full ${pulseClass} opacity-80 pointer-events-none"></div>
      <div class="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr ${bgGradient} border-2 ${ringClass} shadow-lg text-white font-bold text-[10px] cursor-pointer">
        <span>${event.truthScore}%</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: "custom-leaflet-marker",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16]
  });
};

export const WeatherMap = ({ 
  events = [], 
  selectedEvent = null, 
  onSelectEvent, 
  height = "520px", 
  showHeatmap = false,
  mapCenter = [22.5937, 78.9629],
  mapZoom = 5,
  mapConfig = { providerId: "esri-dark" }
}) => {
  let provider = MAP_PROVIDERS.find(p => p.id === mapConfig.providerId) || MAP_PROVIDERS[0];
  let tileUrl = provider.url;
  let attribution = provider.attribution;

  if (provider.keyType === "carto" && mapConfig.cartoKey) {
    tileUrl = tileUrl.replace("{API_KEY}", mapConfig.cartoKey);
  } else if (provider.keyType === "mapbox" && mapConfig.mapboxKey) {
    tileUrl = tileUrl.replace("{API_KEY}", mapConfig.mapboxKey);
  } else if (provider.keyType === "maptiler" && mapConfig.maptilerKey) {
    tileUrl = tileUrl.replace("{API_KEY}", mapConfig.maptilerKey);
  } else if (provider.keyType === "stadia" && mapConfig.stadiaKey) {
    tileUrl = tileUrl.replace("{API_KEY}", mapConfig.stadiaKey);
  } else if (provider.requiresKey) {
    // Fallback to Esri World Dark Gray Canvas with zero watermark
    const fallbackProv = MAP_PROVIDERS[0]; // esri-dark
    tileUrl = fallbackProv.url;
    attribution = fallbackProv.attribution;
  }

  // OpenWeatherMap Precipitation Overlay tile url
  const owmKey = mapConfig.owmKey || "demo_key";
  const precipitationOverlayUrl = `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${owmKey}`;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950" style={{ height }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        minZoom={4}
        maxZoom={14}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", background: "#0b132b" }}
      >
        <MapFlyTo center={mapCenter} zoom={mapZoom} />

        {/* Primary Basemap Layer */}
        <TileLayer
          key={tileUrl}
          attribution={attribution}
          url={tileUrl}
        />

        {/* Optional OpenWeatherMap Live Precipitation Radar Overlay */}
        {mapConfig.showRadarOverlay && (
          <TileLayer
            key={`owm-${owmKey}`}
            url={precipitationOverlayUrl}
            opacity={0.65}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        )}

        {/* Simulated Heatmap Intensity Circles */}
        {showHeatmap && events.map((evt) => {
          const isHigh = evt.severity === "HIGH";
          const radius = isHigh ? 75000 : evt.severity === "MEDIUM" ? 45000 : 25000;
          const color = isHigh ? "#ef4444" : evt.severity === "MEDIUM" ? "#f59e0b" : "#0284c7";

          return (
            <Circle
              key={`heat-${evt.id}`}
              center={[evt.latitude, evt.longitude]}
              radius={radius}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.18,
                weight: 1,
                dashArray: "4, 6"
              }}
            />
          );
        })}

        {/* Event Markers with Rich Popups */}
        {events.map((evt) => (
          <Marker
            key={evt.id}
            position={[evt.latitude, evt.longitude]}
            icon={createCustomMarker(evt)}
            eventHandlers={{
              click: () => {
                if (onSelectEvent) onSelectEvent(evt);
              }
            }}
          >
            <Popup className="weather-popup">
              <div className="w-72 p-1 text-slate-100 font-sans">
                {/* Popup Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                      {evt.id}
                    </span>
                    <span className="text-xs font-extrabold text-white">
                      {evt.eventType.toUpperCase()}
                    </span>
                  </div>
                  <SeverityBadge severity={evt.severity} size="sm" />
                </div>

                {/* Location & Time */}
                <div className="mb-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    {evt.location}, <span className="text-slate-400 text-xs font-normal">{evt.state}</span>
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {evt.timestamp}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span>{evt.reportsCount} Reports</span>
                  </div>
                </div>

                {/* Truth Score Bar */}
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-700/70 mb-2.5">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-300 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      Truth Score
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {evt.truthScore}% ({evt.verificationStatus})
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        evt.truthScore >= 80 ? 'bg-emerald-400' : evt.truthScore >= 50 ? 'bg-amber-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${evt.truthScore}%` }}
                    />
                  </div>
                </div>

                {/* Primary Source */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3 px-1">
                  <span>Source:</span>
                  <span className="font-medium text-slate-200 truncate max-w-[170px]">
                    {evt.primarySource || evt.source}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onSelectEvent && onSelectEvent(evt)}
                    className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Event
                  </button>

                  <button
                    onClick={() => onSelectEvent && onSelectEvent(evt)}
                    className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Reports ({evt.reportsCount})
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
