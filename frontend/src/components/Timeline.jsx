"use client";

import React from "react";

export default function Timeline({ metrics }) {
  if (!metrics.length) {
    return <span>No metrics available.</span>
  }

  const recentToOldMetrics = [...metrics].reverse();
  
  return (
    <div className="flex flex-col items-center">
      {recentToOldMetrics.map((metric, index) => (
        <div key={metric._id} className="flex w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-brand-primary/80 text-white flex items-center justify-center">
              {metrics.length - index}
            </div>

            {index !== recentToOldMetrics.length - 1 && (
              <div className="w-px bg-gray-300 flex-1"></div>
            )}
          </div>

          <div className="ml-4 flex flex-col justify-center">
            <span className="font-semibold">{metric.name}</span>

            <span className="text-sm text-gray-600">Value: {metric.value}</span>

            <span className="text-xs text-gray-500">
              {new Date(metric.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
