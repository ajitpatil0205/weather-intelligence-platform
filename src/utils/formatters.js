export const formatNumber = (num) => {
  if (num === undefined || num === null) return "0";
  return new Intl.NumberFormat("en-IN").format(num);
};

export const formatPercentage = (val) => {
  if (val === undefined || val === null) return "0%";
  return `${Math.round(val)}%`;
};

export const formatCoordinates = (lat, lng) => {
  if (!lat || !lng) return "N/A";
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
};
