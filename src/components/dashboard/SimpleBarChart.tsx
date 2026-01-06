// src/components/dashboard/SimpleBarChart.tsx

import React from "react";

export interface BarChartData {
  label: string;
  value: number;
  color?: string;
}

export interface SimpleBarChartProps {
  data: BarChartData[];
  height?: number;
  showValues?: boolean;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  height = 300,
  showValues = true,
}) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div style={{ width: "100%", height }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          height: "100%",
          gap: "10px",
        }}
      >
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          const color = item.color || "#1890ff";

          return (
            <div
              key={index}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              {showValues && (
                <div
                  style={{
                    marginBottom: 8,
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#262626",
                  }}
                >
                  {item.value.toLocaleString()}
                </div>
              )}
              <div
                style={{
                  width: "100%",
                  height: `${barHeight}%`,
                  backgroundColor: color,
                  borderRadius: "4px 4px 0 0",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                title={`${item.label}: ${item.value}`}
              />
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: "#8c8c8c",
                  textAlign: "center",
                  wordBreak: "break-word",
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleBarChart;
