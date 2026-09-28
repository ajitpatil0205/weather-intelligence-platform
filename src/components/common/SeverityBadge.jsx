import React from 'react';
import { getSeverityColor } from '../../utils/scoringEngine';

export const SeverityBadge = ({ severity, size = "md", pulse = false }) => {
  const styles = getSeverityColor(severity);
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1 font-semibold";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full uppercase tracking-wider ${styles.badge} ${sizeClasses}`}>
      <span className={`w-2 h-2 rounded-full ${styles.indicator} ${pulse ? styles.pulse : ''}`} />
      {severity || "LOW"}
    </span>
  );
};
