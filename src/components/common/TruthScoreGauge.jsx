import React from 'react';

export const TruthScoreGauge = ({ score = 85, size = 120, strokeWidth = 10, showLabel = true, subText = "Truth Score" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  let strokeColor = "#10b981"; // Green (Verified)
  let statusText = "VERIFIED";
  let statusColor = "text-emerald-400";

  if (clampedScore < 50) {
    strokeColor = "#ef4444"; // Red (Unverified)
    statusText = "UNVERIFIED";
    statusColor = "text-red-400";
  } else if (clampedScore < 80) {
    strokeColor = "#f59e0b"; // Orange (Review)
    statusText = "REVIEW";
    statusColor = "text-amber-400";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline">
            <span className="text-2xl font-black tracking-tight text-white">{clampedScore}</span>
            <span className="text-xs text-slate-400 font-medium ml-0.5">/100</span>
          </div>
          <span className={`text-[10px] font-bold tracking-wider uppercase ${statusColor}`}>
            {statusText}
          </span>
        </div>
      </div>

      {showLabel && (
        <span className="mt-2 text-xs font-medium text-slate-400">
          {subText}
        </span>
      )}
    </div>
  );
};
