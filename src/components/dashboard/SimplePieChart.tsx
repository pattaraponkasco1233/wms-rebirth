// src/components/dashboard/SimplePieChart.tsx

import React from "react";

export interface PieChartData {
  label: string;
  value: number;
  color: string;
}

export interface SimplePieChartProps {
  data: PieChartData[];
  size?: number;
  showLegend?: boolean;
}

const SimplePieChart: React.FC<SimplePieChartProps> = ({
  data,
  size = 200,
  showLegend = true,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const paths = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    currentAngle = endAngle;

    const startX = 100 + 90 * Math.cos((Math.PI * startAngle) / 180);
    const startY = 100 + 90 * Math.sin((Math.PI * startAngle) / 180);
    const endX = 100 + 90 * Math.cos((Math.PI * endAngle) / 180);
    const endY = 100 + 90 * Math.sin((Math.PI * endAngle) / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M 100 100`,
      `L ${startX} ${startY}`,
      `A 90 90 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `Z`,
    ].join(" ");

    return {
      path: pathData,
      color: item.color,
      label: item.label,
      value: item.value,
      percentage: percentage.toFixed(1),
    };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        style={{ transform: "rotate(-90deg)" }}
      >
        {paths.map((item, index) => (
          <path
            key={index}
            d={item.path}
            fill={item.color}
            stroke="#fff"
            strokeWidth="2"
            style={{ cursor: "pointer" }}
          >
            <title>{`${item.label}: ${item.value} (${item.percentage}%)`}</title>
          </path>
        ))}
      </svg>

      {showLegend && (
        <div style={{ flex: 1 }}>
          {paths.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: item.color,
                  borderRadius: 2,
                  marginRight: 8,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: "#262626" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 12, color: "#8c8c8c" }}>
                  {item.value.toLocaleString()} ({item.percentage}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimplePieChart;
