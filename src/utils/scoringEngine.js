export const calculateTruthScore = ({
  sourceReliability = 90,
  contentConfidence = 85,
  locationConsistency = 90,
  crossSourceAgreement = 85,
  weights = { source: 0.35, content: 0.20, location: 0.25, agreement: 0.20 }
}) => {
  const totalWeight = weights.source + weights.content + weights.location + weights.agreement;
  const weightedSum = (
    sourceReliability * weights.source +
    contentConfidence * weights.content +
    locationConsistency * weights.location +
    crossSourceAgreement * weights.agreement
  );
  
  const score = Math.round(weightedSum / totalWeight);
  
  let status = "UNVERIFIED";
  if (score >= 80) {
    status = "VERIFIED";
  } else if (score >= 50) {
    status = "REVIEW";
  }

  return {
    score,
    status,
    isReliable: score >= 80
  };
};

export const getSeverityColor = (severity) => {
  switch (severity?.toUpperCase()) {
    case "HIGH":
      return {
        badge: "bg-red-500/15 text-red-400 border border-red-500/30",
        indicator: "bg-red-500",
        markerColor: "#ef4444",
        border: "border-red-500",
        pulse: "radar-pulse-high"
      };
    case "MEDIUM":
      return {
        badge: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
        indicator: "bg-amber-500",
        markerColor: "#f59e0b",
        border: "border-amber-500",
        pulse: "radar-pulse-med"
      };
    case "LOW":
    default:
      return {
        badge: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
        indicator: "bg-sky-500",
        markerColor: "#0284c7",
        border: "border-sky-500",
        pulse: ""
      };
  }
};

export const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "VERIFIED":
      return {
        badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
        indicator: "bg-emerald-500",
        text: "Verified"
      };
    case "REVIEW":
      return {
        badge: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
        indicator: "bg-amber-500",
        text: "Under Review"
      };
    case "UNVERIFIED":
    default:
      return {
        badge: "bg-slate-500/15 text-slate-400 border border-slate-500/30",
        indicator: "bg-slate-500",
        text: "Unverified"
      };
  }
};
