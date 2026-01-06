// src/components/common/VersionDisplay.tsx

import React from "react";
import { Typography, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getVersionWithEnv, VERSION_INFO } from "../../config/version.config";

const { Text } = Typography;

export interface VersionDisplayProps {
  showEnvironment?: boolean;
  showBuildDate?: boolean;
  size?: "small" | "default" | "large";
  align?: "left" | "center" | "right";
  showTooltip?: boolean;
}

const VersionDisplay: React.FC<VersionDisplayProps> = ({
  showEnvironment = true,
  showBuildDate = false,
  size = "default",
  align = "center",
  showTooltip = true,
}) => {
  const getFontSize = () => {
    switch (size) {
      case "small":
        return 11;
      case "large":
        return 14;
      default:
        return 12;
    }
  };

  const tooltipContent = (
    <div style={{ fontSize: 12 }}>
      <div>
        <strong>Version:</strong> {VERSION_INFO.version}
      </div>
      <div>
        <strong>Environment:</strong> {VERSION_INFO.environment}
      </div>
      <div>
        <strong>Build Date:</strong>{" "}
        {new Date(VERSION_INFO.buildDate).toLocaleString()}
      </div>
    </div>
  );

  return (
    <div
      style={{
        textAlign: align,
        padding: "8px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: align,
          gap: 4,
        }}
      >
        <Text type="secondary" style={{ fontSize: getFontSize() }}>
          WMS Rebirth v{getVersionWithEnv()}
        </Text>
        {showTooltip && (
          <Tooltip title={tooltipContent}>
            <InfoCircleOutlined
              style={{ fontSize: getFontSize() - 2, color: "#8c8c8c" }}
            />
          </Tooltip>
        )}
      </div>

      {showEnvironment && (
        <div>
          <Text type="secondary" style={{ fontSize: getFontSize() - 1 }}>
            {VERSION_INFO.environment.toUpperCase()} Environment
          </Text>
        </div>
      )}

      {showBuildDate && (
        <div>
          <Text type="secondary" style={{ fontSize: getFontSize() - 1 }}>
            Build: {new Date(VERSION_INFO.buildDate).toLocaleDateString()}
          </Text>
        </div>
      )}
    </div>
  );
};

export default VersionDisplay;
