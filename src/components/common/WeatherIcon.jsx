import React from 'react';
import { 
  Waves, 
  CloudRain, 
  CloudLightning, 
  Sun, 
  CloudFog, 
  Wind, 
  Disc, 
  CloudSnow, 
  Zap, 
  CloudSun 
} from 'lucide-react';

export const WeatherIcon = ({ type, className = "w-5 h-5", color }) => {
  const normalized = (type || "").toLowerCase().replace(/[\s-_]+/g, '');
  
  if (normalized.includes('flood')) return <Waves className={className} style={{ color }} />;
  if (normalized.includes('rain')) return <CloudRain className={className} style={{ color }} />;
  if (normalized.includes('thunder')) return <CloudLightning className={className} style={{ color }} />;
  if (normalized.includes('heat') || normalized.includes('sun')) return <Sun className={className} style={{ color }} />;
  if (normalized.includes('fog')) return <CloudFog className={className} style={{ color }} />;
  if (normalized.includes('dust') || normalized.includes('sand')) return <Wind className={className} style={{ color }} />;
  if (normalized.includes('wind')) return <Wind className={className} style={{ color }} />;
  if (normalized.includes('cyclone') || normalized.includes('storm')) return <Disc className={className} style={{ color }} />;
  if (normalized.includes('hail') || normalized.includes('snow')) return <CloudSnow className={className} style={{ color }} />;
  if (normalized.includes('lightning')) return <Zap className={className} style={{ color }} />;
  
  return <CloudSun className={className} style={{ color }} />;
};
