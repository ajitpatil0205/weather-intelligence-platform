import React from 'react';
import { getStatusColor } from '../../utils/scoringEngine';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export const StatusBadge = ({ status, size = "md" }) => {
  const styles = getStatusColor(status);
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1 font-medium";

  const getIcon = () => {
    switch (status?.toUpperCase()) {
      case "VERIFIED":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case "REVIEW":
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${styles.badge} ${sizeClasses}`}>
      {getIcon()}
      <span>{styles.text}</span>
    </span>
  );
};
